import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? { children } : navigate("/login");
}
