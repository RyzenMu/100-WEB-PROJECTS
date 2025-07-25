import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = document.cookie.includes('connect.sid'); // session-based auth

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
