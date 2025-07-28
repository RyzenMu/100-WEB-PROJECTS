// pages/Register.jsx
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const [dialog, setDialog] = useState({ message: "", visible: false });

  useEffect(() => {
    const img = new Image();
    img.src = "https://picsum.photos/id/1011/1600/900.jpg";
    setImage(img.src);
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setDialog({ message: "Registered successfully", visible: true });
      } else {
        setDialog({ message: "Registration failed: " + result.error, visible: true });
      }
    } catch (err) {
      setDialog({ message: "An error occurred: " + err.message, visible: true });
    }
  };

  const closeDialog = () => {
    setDialog({ message: "", visible: false });
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-28 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input {...register("name")} placeholder="Full Name" className="w-full mb-4 p-2 border rounded" required />
        <input {...register("dob")} type="date" className="w-full mb-4 p-2 border rounded" required />
        <select {...register("gender")} className="w-full mb-4 p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input {...register("email")} type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" required />
        <input {...register("password")} type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" required />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="mr-2" /> Already Registered? <Link to="/login" className="text-blue-500 ml-2">Login</Link>
          </label>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Register</button>
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
