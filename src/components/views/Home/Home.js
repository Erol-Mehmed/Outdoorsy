




















import Header from '../Header/Header';
import SearchField from '../SearchField/SearchField';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <Header />
            <SearchField />
        </div>
    );
};

export default Home;