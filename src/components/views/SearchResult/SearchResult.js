




















import { useContext, useState } from 'react';
import { UserDataContext } from '../../../App';
import usePromise from 'react-use-promise';
import styles from './SearchResult.module.css';

function ResultRows() {
    const { result } = useContext(UserDataContext);
    const resultHtml = [];
    let i = 0;
    console.log(result);

    if (result !== undefined) {

        for (let obj of result) {

            resultHtml.push(
                <div className={styles.row} key={i++}>
                    <img className={styles.img} src={`${obj.imageUrl}`} />
                    <p className={styles.name}>
                        {obj.name}
                    </p>
                </div>
            );
        }

        return resultHtml;
    }
}

function SearchResult() {

    return (
        <div className={styles.main}>
            <ResultRows />
        </div>
    );
}


export default SearchResult;