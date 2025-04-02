// import Header from './Header';
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";
import Layout from "./Layout";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="register" element={<Register />} />

            <Route path="login" element={<Login />} />
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
