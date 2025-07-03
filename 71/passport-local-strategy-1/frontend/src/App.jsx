import React from "react";
import { BrowserRouter, Routes, Route, data } from "react-router-dom";
import SignupTemplate from './SignupTemplate';
import Login from './Login'
import Protected from './Protected'
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupTemplate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </BrowserRouter>
  );
}
