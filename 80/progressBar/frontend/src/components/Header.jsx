// components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">MyBank</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/main" className="hover:underline">Dashboard</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
        </div>
      </nav>
    </header>
  );
}