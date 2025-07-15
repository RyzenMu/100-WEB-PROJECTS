import React from "react";
import Panel from "./Panel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import Login from "./Login";
import Final from "./Final";

export default function App() {
  return (
    <BrowserRouter className="p-8 flex justify-center items-center h-screen">
      <Routes>
        <Route path="/protected" element={<Protected />} />
        <Route path="/" element={<Panel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/final" element={<Final />} />
      </Routes>
    </BrowserRouter>
  );
}
