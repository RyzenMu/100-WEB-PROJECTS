import { BrowserRouter, Routes, Route } from "react-router-dom"
import Protected from "./Protected"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/protected" element={<Protected/>} />
      </Routes>
    </BrowserRouter>
  )
}
