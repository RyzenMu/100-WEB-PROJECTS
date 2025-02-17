import { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [show, setShow] = useState(false);
  const [showS1, setShowS1] = useState(false);
  const [showS2, setShowS2] = useState(false);
  const [showS3, setShowS3] = useState(false);
  function accordion() {
    setShow((prev) => !prev);
  }
  return (
    <div>
      <div className={styles.accordionContainer}>
        <div className={styles.accordion}>
          <div className={styles.question} onClick={accordion}>
            Question 1
          </div>
          <div className={`${styles.answer} ${show ? "" : styles.toggle} `}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            vitae, quod, veniam quam provident eos libero saepe necessitatibus
            voluptatibus laboriosam labore. Velit perferendis, recusandae ullam
            est atque sunt dolorem veritatis blanditiis impedit iste molestiae
            ipsa modi ad hic, unde natus quisquam commodi debitis sint
            doloremque quidem. Quis doloribus laboriosam quas!
          </div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        This is a menu container
        <ul>
          <li onClick={() => setShowS1((prev) => !prev)}>
            menu1
            <ul
              className={`${styles.submenu} ${showS1 ? styles.showS1 : ""} ${
                styles.menu1
              }`}
            >
              <li>submenu1</li>
              <li>submenu2</li>
              <li>submenu3</li>
            </ul>
          </li>

          <li onClick={() => setShowS2((prev) => !prev)}>
            menu2
            <ul
              className={`${styles.submenu} ${showS2 ? styles.showS2 : ""} ${
                styles.menu2
              }`}
            >
              <li>submenu1</li>
              <li>submenu2</li>
              <li>submenu3</li>
            </ul>
          </li>
          <li onClick={() => setShowS3((prev) => !prev)}>
            menu3
            <ul
              className={`${styles.submenu} ${showS3 ? styles.showS3 : ""} ${
                styles.menu3
              }`}
            >
              <li>submenu1</li>
              <li>submenu2</li>
              <li>submenu3</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
