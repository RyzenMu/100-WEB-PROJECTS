import React, { useEffect, useState } from "react";

export default function Messagepage() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showSuccessTimer, setShowSuccessTimer] = useState(true);

  // Auto-hide green message after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessTimer(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-close green message after 5s
  useEffect(() => {
    if (!showSuccessTimer) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessTimer]);

  return (
    <div>
      {/* Pink Initial Timer Message */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showSuccessTimer ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } bg-pink-300 text-2xl text-white p-5 w-max rounded-full flex m-5`}
      >
        <p>Preparing login...</p>
        <span className="ml-5">X</span>
      </div>

      {/* Green Success Message */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showSuccess ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } bg-green-300 text-2xl text-white p-5 w-max rounded-full flex m-5`}
      >
        <p>Successfully logged in</p>
        <span className="ml-5 cursor-pointer" onClick={() => setShowSuccess(false)}>
          X
        </span>
      </div>
    </div>
  );
}
