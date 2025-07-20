// PatientInfo.jsx
import React, { useState } from "react";

export default function PatientInfo() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    occupation: "",
    address: "",
    pastConditions: "",
    currentIssue: "",
    issueDuration: "",
    symptoms: "",
    temperature: "",
    urineColor: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Patient Info:", form);
    // Send to backend or Supabase
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400">
          Patient Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Name", key: "name" },
            { label: "Age", key: "age" },
            { label: "Sex", key: "sex" },
            { label: "Height (cm)", key: "height" },
            { label: "Weight (kg)", key: "weight" },
            { label: "Occupation", key: "occupation" },
            { label: "Address", key: "address" },
            { label: "Past Medical Conditions", key: "pastConditions" },
            { label: "Current Health Issue", key: "currentIssue" },
            { label: "Issue Duration", key: "issueDuration" },
            { label: "Symptoms", key: "symptoms" },
            { label: "Temperature", key: "temperature" },
            { label: "Color of Urine", key: "urineColor" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block mb-1 font-semibold">
                {field.label}
              </label>
              <input
                type="text"
                name={field.key}
                value={form[field.key]}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded text-gray-900 font-bold"
          >
            Submit Info
          </button>
        </form>
      </div>
    </div>
  );
}
