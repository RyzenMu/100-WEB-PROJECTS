import styles from "./Header.module.css";

function Header() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.topLine}>⭐⭐free courses⭐⭐</div>
      </div>
      <div className={styles.navbar}>
        <ul>
          <li>Home</li>
          <li>Courses</li>
          <li>About us</li>
          <li>Pricing</li>
          <li>Contact</li>
          <li>Login</li>
          <li>Sign up</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
