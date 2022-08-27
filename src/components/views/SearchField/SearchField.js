




















import { useForm } from 'react-hook-form';
import styles from './SearchField.module.css';

function SearchField() {
    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        const host = "https://search.outdoorsy.com/rentals?";
        const url = data.keywords;
        console.log(data.keywords);

        const options = {
            method: "GET"
        }

        try {
            const response = await fetch(host + url, options);

            if (response.ok !== true) {
                if (response.status === 403) localStorage.removeItem("user");
                const error = await response.json();
                throw new Error(error.message);
            }

            if (response.status == 204) {
                return response;
            } else {
                const test = await response.json();
                console.log(test.data[1].attributes.name);
                return response.json();
            }

        } catch (error) {
            alert(error);
        }


    }

    return (

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input name='keywords' {...register('keywords')} className={styles.searchField} placeholder='Enter keyword to find vehicle' required />
            <button className={styles.submitBtn} type='submit'>Submit</button>
        </form>

    );

};

export default SearchField;