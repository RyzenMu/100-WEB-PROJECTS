import React from "react";
import { useForm } from "react-hook-form";
import supabase from "./supabase";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login failed: " + error.message);
        return;
      }

      console.log("Login successful:", authData);
      alert("Logged in as " + authData.user.email);
    } catch (err) {
      console.error("Unexpected error:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      {/* Email */}
      <div style={fieldWrapper}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          style={inputStyle}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div style={fieldWrapper}>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          style={inputStyle}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
      </div>

      <button type="submit" style={buttonStyle}>
        Login
      </button>
    </form>
  );
}

const formStyle = {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  };
  
  const fieldWrapper = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.2rem",
  };
  
  const labelStyle = {
    marginBottom: "0.5rem",
    fontWeight: "bold",
  };
  
  const inputStyle = {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };
  
  const errorStyle = {
    marginTop: "0.3rem",
    color: "red",
    fontSize: "0.8rem",
  };
  
  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  };
  
