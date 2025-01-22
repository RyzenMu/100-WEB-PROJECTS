import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import MyProvider from "./components/MyProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </StrictMode>
);
