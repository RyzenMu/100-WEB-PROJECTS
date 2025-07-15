import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function Panel() {
  const [login, setLogin] = useState(false);

  function startLoginProcess() {
    setTimeout(async () => {
      console.log("login process started");
      try {
        const res = await fetch("http://localhost:3000/api/hello", {
          method: "GET",
        });
        const data = await res.text();
        alert("Server response: " + data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }, 2000); // <-- fixed missing delay time
  }

  function handleRange(e) {
    const value = e.target.value;
    if (value == 100) startLoginProcess();
  }

  const navigate = useNavigate()

  async function handleLogin(){
    const res = await fetch('http://localhost:3000/api/login', {
        method: "GET",
    })
    const data = await res.text()
    navigate('/login', {
        state: data
    })
  }

  return (
    <div className="w-[500px] h-[500px] border p-5 bg-slate-300">
      <h1 className="text-xl font-bold mb-4">Login Panel</h1>
      <input
        type="range"
        className="range-slider w-full"
        onChange={handleRange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
