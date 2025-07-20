import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      console.log(res)
      if (res.ok) {
        navigate("/patient-info");
      } else {
        const data = await res.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Login
        </h2>

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email"
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
      </form>
    </div>
  );
}
