import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './Home';
import Register from './Register'
import Login from './Login'
import Card from './Card';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/card' element={<Card/>} />
      </Routes>
      
    </BrowserRouter>
  );
}
