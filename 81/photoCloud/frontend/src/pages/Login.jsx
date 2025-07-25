// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Login successful!');
        navigate('/photos');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full mb-2 p-2 border" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full mb-4 p-2 border" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
}