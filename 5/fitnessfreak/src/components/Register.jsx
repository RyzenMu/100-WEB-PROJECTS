import styles from "./Register.module.css";
import { useContext } from "react";
import MyContext from "./MyContext";

function Register() {
  const { state, dispatch } = useContext(MyContext);

  function update() {
    dispatch({
      type: "register",
      payload: {
        username: state.username + "key",
        password: state.password + "key",
      },
    });

    // Use useEffect or logging after rendering to check updated state.
    console.log("New username will be:", state.username + "key");
    console.log("New password will be:", state.password + "key");
  }

  return (
    <div className={styles.registerContainer}>
      <div>
        <h1>Register</h1>
      </div>
      <div className={styles.register}>
        <label htmlFor="username" className={styles.item1}>
          Username
        </label>
        <input
          type="text"
          required
          value={state.username}
          placeholder="username"
          className={styles.item2}
          onChange={(e) =>
            dispatch({
              type: "register",
              payload: { username: e.target.value, password: state.password },
            })
          }
        />
        <label htmlFor="password" className={styles.item3}>
          Password
        </label>
        <input
          type="password"
          required
          value={state.password}
          placeholder="password"
          className={styles.item4}
          onChange={(e) =>
            dispatch({
              type: "register",
              payload: { username: state.username, password: e.target.value },
            })
          }
        />
        <button className={styles.item5} onClick={update}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Register;
