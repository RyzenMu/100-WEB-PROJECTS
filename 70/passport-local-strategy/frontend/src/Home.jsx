import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header className="bg-blue-500 h-[200px]">
        <div className="flex justify-between p-7">
          <div>
            <h1 className="text-white text-4xl p-5 font-bold"><Link>Facebook</Link></h1>
          </div>
          <div className="text-white text-2xl p-5 w-[500px] justify-between">
            <button className="bg-white text-blue-500 m-7 border p-3 rounded-full">
              <Link to={'register'}>Sign Up</Link>
            </button>
            <button className="bg-white text-blue-500 m-7 border p-3 rounded-full">
              <Link to='login'>Log in</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
