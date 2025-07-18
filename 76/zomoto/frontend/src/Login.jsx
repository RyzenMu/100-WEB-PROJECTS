import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", form);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important if using sessions
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/foodmenu"); // ✅ handle success in frontend
        } else {
          alert(data.message);
        }
      });

    setForm({ username: "", password: "" });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Welcome Back 🍔
        </h2>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded transition"
        >
          Log In
        </button>

        <p className="text-sm text-gray-400 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
