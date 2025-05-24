import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div>
        <ul className={styles.left}>
          <li>Sunday : 08.00 am to 06.00 pm</li>
          <li>Monday : closed</li>
          <li>Tuesday - Saturday : 09.00 am to 06.00 pm</li>
        </ul>
      </div>
      <div>
        <ul className={styles.right}>
          <li>Tel : 020 8952 6700</li>
          <li>email : info@meeracaters.com</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
