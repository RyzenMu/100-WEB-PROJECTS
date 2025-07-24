// components/SubjectProgress.jsx
import { useState } from "react";

export default function SubjectProgress() {
  const [scores, setScores] = useState({
    english: "",
    hindi: "",
    math: "",
    science: "",
    social: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // allow empty or valid number between 0 and 100
    if (value === "" || (/^\d{1,3}$/.test(value) && +value <= 100)) {
      setScores({ ...scores, [name]: value });
    }
  };

  const total = Object.values(scores).reduce(
    (acc, val) => acc + (parseFloat(val) || 0),
    0
  );

  const percentage = (total / 500) * 100;

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enter Subject Scores</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {["english", "hindi", "math", "science", "social"].map((subject) => (
          <div key={subject}>
            <label className="block capitalize mb-1">{subject}</label>
            <input
              name={subject}
              type="number"
              value={scores[subject]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="0 - 100"
            />
          </div>
        ))}
      </div>

      <div className="mb-2 font-medium">
        Total: {total} / 500 | Percentage: {percentage.toFixed(2)}%
      </div>

      <div className="w-full bg-gray-300 rounded h-6 overflow-hidden">
        <div
          className="bg-green-600 h-full text-white text-sm text-center"
          style={{ width: `${percentage}%` }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>
    </section>
  );
}
