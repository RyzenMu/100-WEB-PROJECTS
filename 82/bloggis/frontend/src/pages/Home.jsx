// pages/Home.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://picsum.photos/id/1005/1600/900')" }}>
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center px-4 text-white min-h-screen">
        <h2 className="text-9xl font-bold mb-6">Welcome to Bloggis</h2>
        <p className="text-4xl mb-6">Free, Easy & Useful for all bloggers</p>
        <p className="text-2xl max-w-xl">
          Share your thoughts, express yourself, and connect with others by writing articles that matter to you.
        </p>
      </main>
      <Footer />
    </div>
  );
}