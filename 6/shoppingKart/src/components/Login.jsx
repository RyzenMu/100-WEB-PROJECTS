import styles from "./Login.module.css";
import { useLogin } from "../contexts/LoginContext";

function Login() {
  const { username, password, isLoggedin, dispatch } = useLogin();
  console.log(username, password, isLoggedin);
  function handleClick() {
    dispatch({
      type: "login",
      payload: { username: "ganguly", password: 444 },
    });
  }
  return (
    <div className={styles.login}>
      Login
      <div className={styles.box}>
        <label htmlFor="username">User name</label>
        <input type="text" name="username" required />
        <label htmlFor="password">password</label>
        <input type="password" name="password" required />
        <button className={styles.button} onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
