import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/patient-info", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <div className="text-white">Loading...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return children;
}
