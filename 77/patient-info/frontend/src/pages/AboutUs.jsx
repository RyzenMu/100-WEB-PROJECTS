// AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">About Us</h1>
        <p className="text-gray-300 text-lg mb-4">
          Welcome to our Hospital Management System. We aim to simplify healthcare
          appointments and patient management using secure, modern technology.
        </p>
        <p className="text-gray-300 text-lg">
          Our mission is to improve the healthcare experience for both patients
          and providers through streamlined digital systems, real-time updates,
          and secure data storage using Supabase.
        </p>
      </div>
    </div>
  );
}
