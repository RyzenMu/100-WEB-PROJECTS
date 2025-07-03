import React, { useState } from "react";
import supabase from "./supabase";

async function insert(username, password1) {
  const { data, error } = await supabase
    .from("passport-local-strategy-username-password")
    .insert([{ username: username , password: password1 }])
    .select();
  if (error) throw new Error(error.message)  
  console.log(data)  
}

export default function SignupTemplate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  function signup(e) {
    e.preventDefault();    
    console.log(name, email, username, password1, password2);
    setName('')
    setEmail('')
    setUsername('')
    setPassword1('')
    setPassword2('')
    insert(username, password1)
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left: Image with overlay */}
        <div className="w-1/2 relative hidden md:block">
          <img
            src="/your-image-path.jpg" // replace with your image
            alt="signup visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-pink-600 opacity-70" />
        </div>

        {/* Right: Signup Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <form className="space-y-5" onSubmit={signup}>
            <div>
              <label className="block mb-1 text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Name..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Email address..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Username..."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                placeholder="************"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={password1}
                name="password1"
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">
                Repeat Password
              </label>
              <input
                type="password"
                placeholder="************"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={password2}
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="font-semibold">Terms of Use</span>
              </label>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </button>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Sign in →
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
