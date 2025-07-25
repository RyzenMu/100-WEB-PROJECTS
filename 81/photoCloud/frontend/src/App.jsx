import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Photos from './pages/Photos';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* 🔒 Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/photos" element={<Photos />} />
      </Route>
    </Routes>
  );
}

export default App;
