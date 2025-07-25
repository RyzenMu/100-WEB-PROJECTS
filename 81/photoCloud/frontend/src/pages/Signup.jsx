// pages/Signup.jsx
import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message || 'Signup successful!');
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <input name="name" type="text" placeholder="Name" onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full mb-4 p-2 border" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Signup</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
}
