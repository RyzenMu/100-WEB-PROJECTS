// pages/Contact.jsx
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Contact message:', form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <textarea name="message" placeholder="Message" onChange={handleChange} className="block w-full mb-4 p-2 border"></textarea>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Send Message</button>
    </form>
  );
}