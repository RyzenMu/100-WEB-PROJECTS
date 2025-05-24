import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.loginContainer}>
      <div>
        <h1>Login</h1>
      </div>
      <div className={styles.login}>
        <label htmlFor="username" className={styles.item1}>
          Username
        </label>
        <input
          type="text"
          required
          value={""}
          placeholder="username"
          className={styles.item2}
        />
        <label htmlFor="password" className={styles.item3}>
          Password
        </label>
        <input
          type="password"
          required
          value={""}
          placeholder="password"
          className={styles.item4}
        />
        <button className={styles.item5}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
