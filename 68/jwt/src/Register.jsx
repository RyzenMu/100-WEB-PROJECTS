import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
      } else {
        setMessage(`❌ ${data.msg || "Registration failed"}`);
      }
    } catch (err) {
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="p-6 space-y-6 text-gray-800 dark:text-white max-w-md mx-auto bg-gray-700 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">📝 Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 transition-colors text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>

      {message && (
        <div className="mt-4 p-3 rounded text-sm bg-gray-900 text-green-400">
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
