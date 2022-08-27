




















import { useContext, useState } from 'react';
import { UserDataContext } from '../../../App';
import styles from './SearchResult.module.css';

function SearchResult() {
    const { result } = useContext(UserDataContext);

    alert(result);

    return (

        <p>Works</p>

    );
};

export default SearchResult;