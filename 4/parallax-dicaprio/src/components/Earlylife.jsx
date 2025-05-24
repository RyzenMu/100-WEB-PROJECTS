import { NavLink } from "react-router-dom";
import styles from "./Earlylife.module.css";

function Earlylife() {
  return (
    <div>
      <h1>Early Life Page</h1>
      <div className={styles.image1}></div>
      <div className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
        repellat laborum rem quam a aut alias mollitia rerum, sint fuga quae.
        Quasi, expedita alias?
      </div>
      <div className={styles.image2}></div>
      <div className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
        repellat laborum rem quam a aut alias mollitia rerum, sint fuga quae.
        Quasi, expedita alias?
      </div>
      <div className={styles.image3}></div>
      <div className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
        repellat laborum rem quam a aut alias mollitia rerum, sint fuga quae.
        Quasi, expedita alias?
      </div>
      <div className={styles.image4}></div>
      <div className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
        repellat laborum rem quam a aut alias mollitia rerum, sint fuga quae.
        Quasi, expedita alias?
      </div>

      <NavLink to={"/"}>Home</NavLink>
    </div>
  );
}

export default Earlylife;
