import React from "react";

const featured = [
  {
    title: "Leonardo da Vinci",
    image: "https://source.unsplash.com/500x300/?leonardo",
    summary: "The original Renaissance man—painter, inventor, and visionary.",
  },
  {
    title: "Marie Curie",
    image: "https://source.unsplash.com/500x300/?science,woman",
    summary: "Pioneering physicist and the first woman to win a Nobel Prize.",
  },
  {
    title: "Mahatma Gandhi",
    image: "https://source.unsplash.com/500x300/?gandhi",
    summary: "Leader of India’s non-violent independence movement.",
  },
];

export default function FeaturedArticles() {
  return (
    <section className="py-14 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Featured Biographies</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((item, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-400 mt-2">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
