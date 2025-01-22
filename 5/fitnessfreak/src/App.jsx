import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
