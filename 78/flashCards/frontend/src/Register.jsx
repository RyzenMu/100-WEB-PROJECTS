import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (!form.agree) {
      alert("You must agree to the terms");
      return;
    }

    console.log("Form Data:", form);
    // Submit to backend here


    fetch('http://localhost:3000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  body: JSON.stringify(form)
})
  .then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Registration failed");
    console.log(data.message);
  })
  .catch((err) => {
    console.error("Client error:", err.message);
  });

  }

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-500 to-emerald-500 flex justify-center items-center"
      style={{
        backgroundImage: "url(https://picsum.photos/1600/800)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          CREATE ACCOUNT
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Repeat your password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <label className="flex items-start text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mr-2 mt-1"
              required
            />
            I agree all statements in{" "}
            <a href="#" className="text-blue-600 ml-1 underline">
              Terms of service
            </a>
          </label>

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white rounded bg-gradient-to-r from-indigo-500 to-cyan-400 hover:opacity-90"
          >
            SIGN UP
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Have already an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
