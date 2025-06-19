import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./Homepage"
import Roadmap from "./Roadmap"
import Auth from './Auth1'
import Register from './Register'
export default function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage/>} />
    <Route path="/main" element={<Roadmap/>} />
    <Route path="/login" element={<Auth/>} />
    <Route path="/register" element={<Register/>} />
  </Routes>
  </BrowserRouter>
}