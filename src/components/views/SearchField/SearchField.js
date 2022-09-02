




















import { useContext } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api/api";
import { UserDataContext } from "../../../App";
import styles from "./SearchField.module.css";

function SearchField() {
  const { resultReference, setResultReference, resultEdit, setResultEdit } = useContext(UserDataContext);
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

    setResultReference(resultArr);
    setResultEdit(resultArr);

  };

  const handleChange = event => {

    const filterResult = () => {
      console.log(min, max);

      resultEdit.forEach((obj, i) => {
        if (min !== undefined && obj.price < min && max === undefined) {
          resultEdit.splice(i, 1);
        } else if (min === undefined && obj.price > max && max !== undefined) {
          resultEdit.splice(i, 1);
        } else if (min !== undefined && max !== undefined && (obj.price < min || obj.price > max)) {
          resultEdit.splice(i, 1);
        }
      });

      setResultEdit(resultEdit);
    }

    
    console.log(event.target.value, event.target.name);
    console.log(resultEdit);
    const minOrMax = event.target.name;
    const minOrMaxValue = event.target.value;

    if (minOrMax === 'min' && minOrMaxValue > 0) {
      min = minOrMaxValue;
      filterResult();
    } else if (minOrMax === 'max' && minOrMaxValue > 0) {
      max = minOrMaxValue;
      filterResult();
    } else {
      setResultEdit(resultReference);
    }

  }

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

        <input className={styles.minInput} name="min"
          placeholder="Enter the min price"
          onChange={handleChange} />

        <input className={styles.maxInput} name="max"
          placeholder="Enter the max price"
          onChange={handleChange} />

      </div>
    </div>

  );
}

export default SearchField;
