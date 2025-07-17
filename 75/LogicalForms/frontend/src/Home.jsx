import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="text-center space-y-8 max-w-lg">
        <h1 className="text-4xl font-bold">Welcome to QuickSurvey</h1>
        <p className="text-gray-400 text-lg">
          Create or participate in surveys in seconds. Simple. Fast. Reliable.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-800 transition-colors px-6 py-2 rounded font-semibold shadow-md"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="bg-green-600 hover:bg-green-800 transition-colors px-6 py-2 rounded font-semibold shadow-md"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
