import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Messagepage from "./Messagepage"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="Messagepage" element={<Messagepage />} />
      </Routes>
    </BrowserRouter>
  )
}
