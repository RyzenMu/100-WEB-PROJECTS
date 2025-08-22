import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Menubar from "./components/Menubar";
import Earlylife from "./components/Earlylife";
import Films from "./components/Films";
import Un from "./components/Un";
import Main from "./components/Main";

function App() {
  const [barDisplay, setBarDisplay] = useState(true);
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/earlylife" element={<Earlylife />} />
          <Route path="/films" element={<Films />} />
          <Route path="/un" element={<Un />} />
          <Route
            path="/"
            element={
              <Main barDisplay={barDisplay} onSetBarDisplay={setBarDisplay} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
