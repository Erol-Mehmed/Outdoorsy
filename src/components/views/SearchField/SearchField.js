




















import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import usePromise from 'react-use-promise';
import { api } from '../../../api/api';
import { UserDataContext } from '../../../App';
import styles from './SearchField.module.css';

function SearchField() {
    const { setResult } = useContext(UserDataContext);
    const resultArr = [];

    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        const curKeyword = data.keyword;
        console.log(curKeyword);
        const test = await api(`filter[keywords]=${curKeyword}&page[limit]=8&page[offset]=8`);
        console.log(test);

        for (let dataObj of test.data) {
            const curImgId = dataObj.relationships.primary_image.data.id;
            const name = dataObj.attributes.name;

            for (let includedObj of test.included) {
                if (includedObj.id === curImgId) {
                   const imageUrl = includedObj.attributes.url;

                    resultArr.push({[name]: imageUrl});
                }
            }

        }

        console.log(resultArr);
        setResult(resultArr);
        return resultArr;

    }


    return (

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input name='keyword' {...register('keyword')} className={styles.searchField} placeholder='Enter keyword to find vehicle' required />
            <button className={styles.submitBtn} type='submit'>Submit</button>
        </form>

    );

};

export default SearchField;