import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/check-auth", {
          credentials: "include",
        });

        const result = await res.json();
        setIsAuth(result.authenticated);
        setLoading(false);
      } catch (err) {
        setIsAuth(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="text-center mt-20">Checking authentication...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
