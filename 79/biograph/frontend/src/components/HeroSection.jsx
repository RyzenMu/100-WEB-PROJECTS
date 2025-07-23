import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center px-6"
         style={{ backgroundImage: "url('https://picsum.photos/1600/900?grayscale')" }}>
      <div className="bg-black bg-opacity-60 p-10 rounded-xl shadow-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          Discover the Lives that Shaped the World
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Real stories, deep biographies, and historic moments.
        </p>
        <Link
          to="/bios"
          className="bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
        >
          Explore Biographies
        </Link>
      </div>
    </div>
  );
}
