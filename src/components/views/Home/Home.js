




















import Header from '../Header/Header';
import SearchField from '../SearchField/SearchField';
import SearchResult from '../SearchResult/SearchResult';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <SearchField />
            <SearchResult />
        </div>
    );
};

export default Home;