import { useContext } from "react";
import { UserDataContext } from "../../../App";
import styles from "./SearchResult.module.css";

function ResultRows() {
  const { resultEdit } = useContext(UserDataContext);
  const rowsArr = [];
  let i = 0;

  if (resultEdit.length === 0) {
    return <p className={styles.noMatch}>No match for your search</p>;
  }

  // console.log(resultEdit);

  for (let obj of resultEdit) {
    rowsArr.push(
      <div className={styles.row} key={i++}>
        <img className={styles.img} src={`${obj.imageUrl}`} />
        <div className={styles.info}>
          <p className={styles.name}>{obj.name}</p>
          <p>Vehicle Type: {obj.vehicleType}</p>
          <p>Price(USD): {obj.price}</p>
        </div>
      </div>
    );
  }
  return rowsArr;
}

function SearchResult() {
  return (
    <div className={styles.main}>
      <ResultRows />
    </div>
  );
}

export default SearchResult;
