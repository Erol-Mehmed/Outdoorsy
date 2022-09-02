




















import { useContext } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api/api";
import { UserDataContext } from "../../../App";
import styles from "./SearchField.module.css";

function SearchField() {
  const { setResult } = useContext(UserDataContext);
  const resultArr = [];
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {

    const curKeyword = data.keyword;
    const responseObject = await api(
      `filter[keywords]=${curKeyword}&page[limit]=8&page[offset]=8`
    );

    for (let dataObj of responseObject.data) {
      const curImgId = dataObj.relationships.primary_image.data.id;
      const name = dataObj.attributes.name;
      const vehicleType = dataObj.attributes.display_vehicle_type;
      const price = dataObj.attributes.price_per_day / 100;
      const currency = dataObj.attributes.presentment_currency;

      for (let includedObj of responseObject.included) {
        if (includedObj.id === curImgId) {
          const imageUrl = includedObj.attributes.url;
          resultArr.push({
            name: name, imageUrl: imageUrl, vehicleType: vehicleType,
            price: price, currency: currency
          });
        }
      }
    }
    console.log(resultArr);
    setResult(resultArr);

    const handleChange = event => {
      let min;
      let max;

      resultArr.forEach((obj, i) => {
        if (min !== undefined && obj.price < min && max === undefined) {
          resultArr.splice(i, 1);
        } else if (min === undefined && obj.price > max && max !== undefined) {
          resultArr.splice(i, 1);
        } else if (min !== undefined && max !== undefined && (obj.price < min || obj.price > max)) {
          resultArr.splice(i, 1);
        }
      });



      setResult(resultArr);
    }

  };

  return (

    <div className={styles.searchMinMax}>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          name="keyword"
          {...register("keyword")}
          className={styles.searchField}
          placeholder="Enter keywords to find vehicle"
          required
        />
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>

      </form>

      <div className={styles.minMaxDiv}>

        <p className={styles.priceDiapason}>Price Diapason:</p>

      <input className={styles.minMaxInput} name="rangeMin"
        {...register("rangeMin")}
        placeholder="Enter the min price"
        onChange={2} />

      <input className={styles.minMaxInput} name="rangeMax"
        {...register("rangeMax")}
        placeholder="Enter the max price"
        onChange={2} />

      </div>

    </div>

  );
}

export default SearchField;
