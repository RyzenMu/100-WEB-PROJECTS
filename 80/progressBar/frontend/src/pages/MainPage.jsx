// pages/MainPage.jsx
import { useNavigate } from "react-router-dom";
import SubjectProgress from "../components/SubjectProgress";


export default function MainPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <section className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Banking Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <p className="mt-2">Welcome to your secure online banking dashboard.</p>
      <SubjectProgress/>
    </section>
  );
}
