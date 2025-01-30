import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Secret from "./Secret.jsx";
import Door from "./Door.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Login />
      <Routes>
        <Route
          path="/secret"
          element={
            <Door>
              <Secret />{" "}
            </Door>
          }
        />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
