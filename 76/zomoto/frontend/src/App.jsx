import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import FoodMenu from './FoodMenu';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/foodmenu"
          element={
            <ProtectedRoute>
              <FoodMenu />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
