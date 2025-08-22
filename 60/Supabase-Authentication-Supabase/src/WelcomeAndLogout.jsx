import React, { useEffect, useState } from "react";
import supabase from "./supabase";

export default function WelcomeAndLogout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Failed to get session:", error.message);
        return;
      }
      setUser(data.session?.user || null);
    };

    getSession();

    // Optional: subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null);
    }
  };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <p style={textStyle}>Welcome, <strong>{user.email}</strong> 👋</p>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
}

const containerStyle = {
    maxWidth: "400px",
    margin: "1rem auto",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#e6f7ff",
    border: "1px solid #91d5ff",
    borderRadius: "8px",
  };
  
  const textStyle = {
    marginBottom: "0.5rem",
    fontSize: "1rem",
  };
  
  const logoutButtonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  
