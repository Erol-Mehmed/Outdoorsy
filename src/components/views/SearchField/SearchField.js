




















import styles from './SearchField.module.css';

function SearchField() {

    return (
        <div className={styles.container}>
            <input className={styles.searchField} placeholder='Enter keyword to find vehicle' required/>
            <button className={styles.submitBtn} type='submit'>Submit</button>
        </div>
    );

};

export default SearchField;