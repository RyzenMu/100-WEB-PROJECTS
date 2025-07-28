// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [dialog, setDialog] = useState({ message: "", visible: false });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        setDialog({ message: "Login successful", visible: true });
        setTimeout(() => navigate("/blogs"), 1000);
      } else {
        setDialog({ message: result.message || "Login failed", visible: true });
      }
    } catch (err) {
      setDialog({ message: "An error occurred: " + err.message, visible: true });
    }
  };

  const closeDialog = () => {
    setDialog({ message: "", visible: false });
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/id/1025/1600/900')" }}>
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-28 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
      {dialog.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <p className="mb-4 text-gray-800">{dialog.message}</p>
            <button onClick={closeDialog} className="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
