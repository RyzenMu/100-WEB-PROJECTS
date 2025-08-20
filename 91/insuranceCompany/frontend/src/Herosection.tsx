import { useNavigate } from "react-router-dom"
import insuranceImage from "./assets/insurance.jpg"

export default function Herosection() {
  const navigate = useNavigate()

  function handleSignup() {
    alert("Signup process initiated")
    navigate("/signup") // navigate to /signup route
  }

  return (
    <div
      className="relative h-screen text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${insuranceImage})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 text-white">
          <div className="font-bold text-3xl md:text-4xl">UIIC ltd</div>

          <nav className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-2xl mt-4 md:mt-0">
            <div>Services</div>
            <div>Products</div>
            <div>Contact us</div>
          </nav>

          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-lg md:text-2xl mt-4 md:mt-0">
            <div>Login</div>
            <div
              onClick={handleSignup}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Signup
            </div>
            <div>Logout</div>
          </div>
        </header>

        {/* Hero Text */}
        <div className="flex flex-1 items-center justify-center px-4">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
            We Ensure A Best Insurance Service
          </h1>
        </div>
      </div>
    </div>
  )
}
