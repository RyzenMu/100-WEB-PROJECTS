import React from "react";
import { useForm } from "react-hook-form";
import supabase from "./supabase";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Signup data:", data);
    signUpNewUser({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>

      {/* Name */}
      <div style={fieldWrapper}>
        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          style={inputStyle}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
      </div>

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

      {/* Mobile Number */}
      <div style={fieldWrapper}>
        <label style={labelStyle}>Mobile Number</label>
        <input
          type="tel"
          style={inputStyle}
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          })}
        />
        {errors.mobile && <p style={errorStyle}>{errors.mobile.message}</p>}
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

      {/* Confirm Password */}
      <div style={fieldWrapper}>
        <label style={labelStyle}>Confirm Password</label>
        <input
          type="password"
          style={inputStyle}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p style={errorStyle}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" style={buttonStyle}>
        Register
      </button>
    </form>
  );
}

// --- Improved Styles ---
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

// --- Supabase Auth Function ---
async function signUpNewUser({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://google.com/",
    },
  });
  if (error) throw new Error(error.message);
  console.log(data);
}
