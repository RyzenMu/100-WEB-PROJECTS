import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContextProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />{" "}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;
