// Footer.jsx
import React from "react";
import { FaHospitalAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10 text-center">
      <div className="flex justify-center items-center space-x-2">
        <FaHospitalAlt className="text-pink-500 text-xl" />
        <p className="text-sm">&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
      </div>
    </footer>
  );
}
