import React from "react";

const trending = [
  "Martin Luther King Jr.",
  "Ada Lovelace",
  "Nikola Tesla",
  "Frida Kahlo",
];

export default function TrendingSection() {
  return (
    <section className="bg-gray-800 py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <ul className="space-y-3 text-yellow-400 list-disc list-inside">
        {trending.map((name, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
