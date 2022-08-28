import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Outdoorsy</h1>
      <h3 className={styles.secondHeading}>
        Search for an RV, camper van, or travel trailer
      </h3>
    </header>
  );
}

export default Header;
