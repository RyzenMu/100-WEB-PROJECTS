// pages/Blogs.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blogs() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("https://picsum.photos/1200/400");
  const [blogText, setBlogText] = useState("");
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Understanding React" },
    { id: 2, title: "Supabase Auth Simplified" },
    { id: 3, title: "Tailwind Tips & Tricks" },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/check-auth", {
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) setUser(result.user);
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    console.log("Blog submitted:", blogText);
    setBlogText("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative">
        <img src={image} alt="Blog Banner" className="w-full h-64 object-cover" />
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded">
          <h2 className="text-xl font-semibold">Welcome, {user?.name || "User"}</h2>
        </div>
      </div>

      <main className="flex-1 px-6 py-8 bg-gray-50">
        <div className="max-w-2xl mx-auto mb-8 flex justify-between items-center">
          <input
            type="file"
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-300 file:text-white hover:file:bg-green-400"
          />
          <button
            onClick={handleSignOut}
            className="bg-green-300 hover:bg-green-400 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>

        <form onSubmit={handleBlogSubmit} className="max-w-2xl mx-auto mb-12">
          <textarea
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
            placeholder="Write your blog here..."
            rows={8}
            className="w-full p-4 border rounded resize-none mb-4"
            required
          />
          <button className="bg-green-300 hover:bg-green-400 text-white px-6 py-2 rounded">Publish</button>
        </form>

        <section className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Other Blogs</h3>
          <ul className="list-disc pl-5 text-blue-600">
            {blogs.map((b) => (
              <li key={b.id} className="mb-2 hover:underline cursor-pointer">{b.title}</li>
            ))}
          </ul>
        </section>
      </main>

      <div className="relative">
        <Footer />
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
