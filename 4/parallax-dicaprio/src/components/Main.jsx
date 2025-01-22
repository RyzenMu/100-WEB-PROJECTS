import styles from "./Main.module.css";
import Menubar from "./Menubar";
/* eslint-disable react/prop-types */

function Main({ barDisplay, onSetBarDisplay }) {
  return (
    <section className={styles.hero}>
      <div
        className={styles.header}
        onClick={() => onSetBarDisplay((prev) => !prev)}
      >
        {barDisplay && <i className="fas fa-bars"></i>}
        {!barDisplay && <Menubar />}
      </div>
    </section>
  );
}

export default Main;
