import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const menu = [
  { name: "Idli", price: "₹30", description: "Steamed rice cakes served with coconut chutney and sambar." },
  { name: "Dosa", price: "₹50", description: "Crispy fermented rice crepe served with chutneys and sambar." },
  { name: "Vada", price: "₹35", description: "Deep-fried lentil donuts, crispy on the outside and soft inside." },
  { name: "Upma", price: "₹40", description: "A savory thick porridge made with semolina and veggies." },
  { name: "Pongal", price: "₹45", description: "Warm and comforting rice-lentil dish seasoned with ghee and spices." },
  { name: "Masala Dosa", price: "₹60", description: "Dosa stuffed with spiced mashed potatoes." },
  { name: "Uttapam", price: "₹55", description: "Thick dosa topped with onions, tomatoes, and green chilies." },
  { name: "Appam with Stew", price: "₹70", description: "Soft rice pancakes served with a mild coconut-based vegetable stew." },
];

export default function FoodMenu() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(100); // 900 seconds = 15 minutes

  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleAutoLogout();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  function handleAutoLogout() {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => navigate("/login"));
  }

  function handleManualLogout() {
    handleAutoLogout(); // reuse the same logic
  }

  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-5 text-white">
      <div className="flex justify-between items-center mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">South Indian Menu</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400 mb-1">
            Auto logout in: <span className="text-yellow-400">{minutes}:{seconds}</span>
          </p>
          <button
            onClick={handleManualLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-semibold text-white shadow"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {menu.map((item, index) => (
          <div key={index} className="bg-gray-800 p-5 shadow-md rounded">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <span className="text-yellow-400 font-bold">{item.price}</span>
            </div>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
