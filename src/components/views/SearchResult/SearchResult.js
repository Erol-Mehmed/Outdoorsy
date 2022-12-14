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

  for (let obj of resultEdit) {
    rowsArr.push(
      <div className={styles.row} key={i++}>
        <img className={styles.img} src={`${obj.imageUrl}`} />
        <div className={styles.info}>
          <p className={styles.name}>{obj.name}</p>
          <p className={styles.vehicleType}>Vehicle Type: {obj.vehicleType}</p>
          <p className={styles.price}>Price: {obj.price}$</p>
        </div>
      </div>
    );
  }
  return rowsArr;
}

function SearchResult() {
  const { resultEdit, limit, setLimit } = useContext(UserDataContext);

  return (
    <div className={styles.main}>
      <ResultRows />
      {resultEdit.length > 0 ? (
        <button
          className={styles.showMoreBtn}
          onClick={() => {
            setLimit(limit + 8);
          }}
        >
          Show More
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchResult;
