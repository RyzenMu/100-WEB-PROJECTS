import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    // e.preventDefault();
    // console.log("Login", form);
    // // Add fetch API call to backend here
    // fetch("http://localhost:3000/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: form.username,
    //     password: form.password,
    //   }),
    // })
    //   .then((res) => res.text())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
    //   setForm({
    //     username: '',
    //     password:''
    //   })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        // onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-6"
        action={'http://localhost:3000/login'}
        method="POST"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
