import { BrowserRouter, Routes, Route } from "react-router-dom";
import Herosection from "./Herosection";
import insuranceImage from "./assets/insurance.jpg";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk";
const supabase = createClient(supabaseUrl, supabaseKey);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("insuranceCompany")
        .insert([{ name, email, password }]) // ✅ insert real state values
        .select();

      if (error) {
        console.error("Supabase error:", error.message);
      } else {
        console.log("Inserted data:", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div
      className="relative h-screen  bg-cover bg-center"
      style={{ backgroundImage: `url(${insuranceImage})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />
      <h2 className="text-3xl font-bold relative z-10">Signup Page</h2>

      <form className="text-3xl relative z-10 space-y-4" onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block text-black p-2"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block text-black p-2"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block text-black p-2"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
