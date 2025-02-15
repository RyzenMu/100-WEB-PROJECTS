import styles from "./App.module.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import PageNotFound from "./components/PageNotFound";
import Menupage from "./components/Menupage";
import Veg from "./components/Veg";
import NonVeg from "./components/NonVeg";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/menu" element={<Menupage />}>
            <Route path="veg" element={<Veg />} />
            <Route path="non-veg" element={<NonVeg />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
