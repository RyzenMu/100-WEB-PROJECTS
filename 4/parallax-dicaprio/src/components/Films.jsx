import { NavLink } from "react-router";
import styles from "./Films.module.css";
import movie1 from "../assets/images/dicaprio-movie-1.png";
import movie2 from "../assets/images/dicaprio-movie-2.png";
import movie3 from "../assets/images/dicaprio-movie-3.png";
import movie4 from "../assets/images/dicaprio-movie-4.png";
import movie5 from "../assets/images/dicaprio-movie-5.png";
function Films() {
  return (
    <div>
      <h1>Five Films</h1>
      <div className={styles.grid}>
        <div className={styles.movie1}>
          <img src={movie1} alt="movie1" />
        </div>
        <div className={styles.movie2}>
          <img src={movie2} alt="movie2" />
        </div>
        <div className={styles.movie3}>
          <img src={movie3} alt="movie3" />
        </div>
        <div className={styles.movie4}>
          <img src={movie4} alt="movie4" />
        </div>
        <div className={styles.movie5}>
          <img src={movie5} alt="movie5" />
        </div>
      </div>
      <NavLink to={"/"}>Home</NavLink>
    </div>
  );
}

export default Films;
