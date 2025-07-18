import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const nearbyRestaurants = [
    {
      name: "Spicy Grill",
      location: "2 km",
      image:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sushi Zen",
      location: "1.2 km",
      image:
        "https://images.unsplash.com/photo-1601315275036-4ad06f4aa319?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Burger Den",
      location: "0.8 km",
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const featuredFoods = [
    {
      name: "Pepperoni Pizza",
      price: "$12",
      image:
        "https://images.unsplash.com/photo-1594007654729-407eedc4be01?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Chicken Biryani",
      price: "$10",
      image:
        "https://images.unsplash.com/photo-1657299176356-ec0e1c14ad7d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Veggie Burger",
      price: "$8",
      image:
        "https://images.unsplash.com/photo-1603052875768-e063582fe3a9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 space-y-10">
      {/* Top Section with Title and Login Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Find Your Food 🍴</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded text-white font-semibold shadow"
        >
          Login
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search restaurants or dishes..."
          className="px-4 py-2 w-full max-w-md rounded-lg text-gray-800"
        />
      </div>

      {/* Nearby Restaurants */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Nearby Restaurants 🏠</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nearbyRestaurants.map((r, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-bold">{r.name}</h3>
              <p className="text-sm text-gray-400">{r.location} away</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Foods */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Foods 🍽️</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredFoods.map((f, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <img
                src={f.image}
                alt={f.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-bold">{f.name}</h3>
              <p className="text-sm text-yellow-400">{f.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
