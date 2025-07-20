import React from "react";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { FaHospital } from "react-icons/fa";

export default function Homepage() {
  const testimonials = Array.from({ length: 3 }, () => ({
    name: faker.person.fullName(),
    message: faker.lorem.sentence(12),
    image: faker.image.avatar(),
  }));

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
          <FaHospital />
          <span>HealthCare+</span>
        </div>
        <nav className="space-x-4">
          <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
          <Link to="/register" className="hover:text-yellow-400 transition">Register</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <img
          src="https://source.unsplash.com/1600x600/?hospital,healthcare"
          alt="Hospital Cover"
          className="w-full h-[400px] object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">Your Health, Our Priority</h1>
          <p className="text-lg text-gray-200 max-w-xl">
            Register today to get started with appointments, checkups, and more.
          </p>
          <div className="mt-6 flex gap-4">
            <Link to="/register" className="bg-yellow-500 px-5 py-2 rounded hover:bg-yellow-600 font-semibold">Get Started</Link>
            <Link to="/login" className="border border-yellow-500 px-5 py-2 rounded hover:bg-yellow-500 font-semibold">Login</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">What Our Patients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded shadow">
              <div className="flex items-center gap-4 mb-3">
                <img src={t.image} alt="avatar" className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">Verified Patient</p>
                </div>
              </div>
              <p className="text-gray-300 italic">“{t.message}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HealthCare+. All rights reserved.
      </footer>
    </div>
  );
}
