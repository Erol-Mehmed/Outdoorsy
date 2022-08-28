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

      for (let includedObj of responseObject.included) {
        if (includedObj.id === curImgId) {
          const imageUrl = includedObj.attributes.url;
          resultArr.push({ name: name, imageUrl: imageUrl });
        }
      }
    }
    setResult(resultArr);
    return resultArr;
  };

  return (
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
  );
}

export default SearchField;
