import React from "react";

const bios = [
  "Abraham Lincoln",
  "Amelia Earhart",
  "Albert Einstein",
  "Nelson Mandela",
  "Steve Jobs",
  "Rosa Parks",
];

export default function BioGrid() {
  return (
    <section className="py-14 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Explore More Bios</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {bios.map((name, i) => (
          <div
            key={i}
            className="bg-gray-700 p-6 rounded shadow hover:shadow-md transition cursor-pointer hover:bg-gray-600"
          >
            <p className="text-lg font-medium">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
