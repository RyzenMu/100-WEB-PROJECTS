import { Outlet } from "react-router-dom";
import "./AppLayout.module.css";

function AppLayout() {
  return (
    <div>
      <header>header</header>
      <main>{<Outlet />}</main>
      <footer>footer</footer>
    </div>
  );
}

export default AppLayout;
