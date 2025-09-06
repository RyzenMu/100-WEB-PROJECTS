import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// Types
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

// API Service
const API_BASE_URL = 'http://localhost:8080';

const apiService = {
  register: async (user: User): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.text();
  },

  login: async (user: Pick<User, 'email' | 'password'>): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, name: '' }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.text();
  }
};

// Header Component
const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white p-4 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">DentalKart</h1>
      </div>
    </header>
  );
};

// Home Screen Component
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <img
          src="https://images.unsplash.com/photo-1606813902787-39b3e4eac2f6"
          alt="Smiling People"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        <button
          onClick={() => navigate('/services')}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Services
        </button>
        <button
          onClick={() => navigate('/appointment')}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Book Appointment
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Register
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
};

// Register Screen Component
const RegisterScreen: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Register clicked → name=', name, 'email=', email);
      const user: User = { name, email, password };
      const response = await apiService.register(user);
      console.log('Registration success:', response);
      setMessage(`Registered: ${response}`);
      
      // Clear form on success
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-md bg-gray-100 border">
            <p className="text-sm">Response: {message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Login Screen Component
const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await apiService.login({ email, password });
      setMessage(`Login success: ${response}`);
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 rounded-md bg-gray-100 border">
            <p className="text-sm">Response: {message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder Components
const ServicesScreen: React.FC = () => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold">Services Page</h2>
  </div>
);

const AppointmentScreen: React.FC = () => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold">Book Appointment Page</h2>
  </div>
);

const FaqsScreen: React.FC = () => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold">FAQs Page</h2>
  </div>
);

const ContactScreen: React.FC = () => (
  <div className="p-6 text-center">
    <h2 className="text-2xl font-bold">Contact Us Page</h2>
  </div>
);

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/services" element={<ServicesScreen />} />
            <Route path="/appointment" element={<AppointmentScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/faqs" element={<FaqsScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;