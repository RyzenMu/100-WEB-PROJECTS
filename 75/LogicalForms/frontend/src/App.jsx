import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './Home.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
