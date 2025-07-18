import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/auth", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          navigate("/login");
        } else {
          setLoggedIn(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  return loggedIn ? children : null;
}
