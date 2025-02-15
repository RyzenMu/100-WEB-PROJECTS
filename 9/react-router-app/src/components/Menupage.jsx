import styles from "./Menupage.module.css";
import { Outlet } from "react-router-dom";

function Menupage() {
  return (
    <div className={styles.menupage}>
      This is a Menu page
      <Outlet />
    </div>
  );
}

export default Menupage;
