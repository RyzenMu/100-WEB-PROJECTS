import styles from "./Hero.module.css";
import Header from "./Header";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className={styles.hero}>
      <Header />
      <div className={styles.subheader}>
        <NavLink to="register" className={styles.navlink}>
          <h1>Register</h1>
        </NavLink>
        <NavLink to="login" className={styles.navlink}>
          <h1>Login</h1>
        </NavLink>
      </div>
    </div>
  );
}

export default Hero;
