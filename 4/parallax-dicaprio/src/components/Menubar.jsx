import styles from "./Menubar.module.css";
import { NavLink } from "react-router-dom";

function Menubar() {
  return (
    <div className={styles.menu}>
      <NavLink className={styles.menuItem} to={"earlylife"}>
        Early Life
      </NavLink>
      <NavLink className={styles.menuItem} to={"films"}>
        Films
      </NavLink>
      <NavLink className={styles.menuItem} to={"un"}>
        UN
      </NavLink>
    </div>
  );
}

export default Menubar;
