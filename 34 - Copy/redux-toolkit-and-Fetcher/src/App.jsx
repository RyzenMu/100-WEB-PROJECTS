import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./user/Login";
import Register from "./user/Register";
import './App.css'
// import './utils/createUserMongo'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
