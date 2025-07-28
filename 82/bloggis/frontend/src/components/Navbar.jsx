// components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10 flex justify-between items-center px-8 py-4">
      <h1 className="text-xl font-bold">Bloggis</h1>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </div>
    </nav>
  );
}
