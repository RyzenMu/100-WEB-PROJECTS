// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Biograph</Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/articles" className="hover:text-yellow-400">Articles</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </nav>
    </header>
  );
}
