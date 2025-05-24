import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <i className="fa fa-heartbeat"></i>
      </div>
      <div className={styles.text}>Fitness Freak</div>
    </div>
  );
}

export default Header;
