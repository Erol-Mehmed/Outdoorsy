




















import { useForm } from 'react-hook-form';
import styles from './SearchField.module.css';

function SearchField() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data.keyword);
   
    return (

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input name='keyword' {...register('keyword')} className={styles.searchField} placeholder='Enter keyword to find vehicle' required />
            <button className={styles.submitBtn} type='submit'>Submit</button>
        </form>

    );

};

export default SearchField;