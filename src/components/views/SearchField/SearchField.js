import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../api/api";
import { UserDataContext } from "../../../App";
import styles from "./SearchField.module.css";

function SearchField() {
  const {
    resultReference,
    setResultReference,
    resultEdit,
    setResultEdit,
    range,
    setRange,
    limit,
    setLimit,
    data,
    setData,
  } = useContext(UserDataContext);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    onSubmit(data);
  }, [limit]);

  const onSubmit = async (data) => {
    const curKeyword = data.keyword;
    const responseObject = await api(
      `filter[keywords]=${curKeyword}&page[limit]=${limit}`
    );

    resultCreation(responseObject);
    setData(data);
  };

  const resultCreation = (responseObject) => {
    const resultArr = [];

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
            name: name,
            imageUrl: imageUrl,
            vehicleType: vehicleType,
            price: price,
            currency: currency,
          });
        }
      }
    }

    setResultReference(resultArr);
    setResultEdit(resultArr);
  };

  const handleChange = (event) => {
    setResultEdit(resultReference);

    setRange((prevState) => {
      return {
        ...prevState,
        [event.target.name]: Number(event.target.value),
      };
    });
  };

  useEffect(() => {
    if (
      (range.min > 0 && range.max > 0 && range.min > range.max) ||
      range.min < 0 ||
      range.max < 0 ||
      isNaN(range.min) ||
      isNaN(range.max)
    ) {
      return;
    }

    setResultEdit(
      resultEdit.filter((obj) => {
        if (obj.price >= range.min && range.max === 0) {
          return obj;
        } else if (obj.price <= range.max && range.min === 0) {
          return obj;
        } else if (
          obj.price >= range.min &&
          obj.price <= range.max &&
          range.min > 0 &&
          range.max > 0
        ) {
          return obj;
        }
      })
    );
  }, [range.min, range.max]);

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
        <button
          className={styles.submitBtn}
          onClick={() => {
            setLimit(8);
            setData({keyword: ''})
          }}
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className={styles.diapasonDiv}>
        <p className={styles.priceDiapason}>Price Diapason:</p>

        <div className={styles.inputFields}>
          <input
            type="number"
            className={styles.minInput}
            name="min"
            placeholder="Enter the min price"
            onChange={handleChange}
          />

          <input
            type="number"
            className={styles.maxInput}
            name="max"
            placeholder="Enter the max price"
            onChange={handleChange}
          />
        </div>

        {range.min < 0 ||
        range.max < 0 ||
        (range.min >= range.max && range.max > 0) ? (
          <p className={styles.wrongDiapason}>Wrong diapason parameters!</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchField;
