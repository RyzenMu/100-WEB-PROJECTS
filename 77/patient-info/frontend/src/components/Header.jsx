// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaHospitalSymbol } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <FaHospitalSymbol className="text-pink-500" />
          <span>HealthBridge</span>
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-pink-400">Home</Link>
          <Link to="/register" className="hover:text-pink-400">Register</Link>
          <Link to="/login" className="hover:text-pink-400">Login</Link>
          <Link to="/about" className="hover:text-pink-400">About Us</Link>
        </nav>
      </div>
    </header>
  );
}
