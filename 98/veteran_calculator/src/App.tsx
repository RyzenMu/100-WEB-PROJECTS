import React, { useState } from 'react';
import { Menu, X, Calculator, Home, Phone, Users, UserPlus, LogIn } from 'lucide-react';

type DrawerPage = 'HOME' | 'ABOUT' | 'CONTACT' | 'CALCULATOR' | 'SIGNUP' | 'LOGIN';

interface User {
  name: string;
  age: number;
  sex: string;
  email: string;
  password: string;
}

const VeteranCalculatorApp: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<DrawerPage>('HOME');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navigateToPage = (page: DrawerPage) => {
    setSelectedPage(page);
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { label: 'Home', page: 'HOME' as DrawerPage, icon: Home },
    { label: 'About Us', page: 'ABOUT' as DrawerPage, icon: Users },
    { label: 'Contact', page: 'CONTACT' as DrawerPage, icon: Phone },
    { label: 'Calculator', page: 'CALCULATOR' as DrawerPage, icon: Calculator },
    { label: 'Signup', page: 'SIGNUP' as DrawerPage, icon: UserPlus },
    { label: 'Login', page: 'LOGIN' as DrawerPage, icon: LogIn },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button 
            onClick={toggleDrawer}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-4 px-2">
          {menuItems.map(({ label, page, icon: Icon }) => (
            <button
              key={page}
              onClick={() => navigateToPage(page)}
              className={`w-full flex items-center px-4 py-3 mb-1 text-left rounded-lg transition-colors ${
                selectedPage === page 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-4">
          <button
            onClick={toggleDrawer}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Veteran Calculator</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {selectedPage === 'HOME' && <HomePage />}
          {selectedPage === 'ABOUT' && <AboutPage />}
          {selectedPage === 'CONTACT' && <ContactPage />}
          {selectedPage === 'CALCULATOR' && <CalculatorPage />}
          {selectedPage === 'SIGNUP' && <SignupPage />}
          {selectedPage === 'LOGIN' && <LoginPage />}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleDrawer}
        />
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  const user = {
    username: 'vivo',
    age: 25,
    sex: 'Male',
    rank: 'Captain',
    score: 85
  };

  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center space-y-4 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.username}!</h2>
        <div className="space-y-2 text-lg text-gray-600">
          <p>Age: {user.age}</p>
          <p>Sex: {user.sex}</p>
          <p>Rank: {user.rank}</p>
          <p>Score: {user.score}</p>
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Us</h2>
      <p className="text-gray-600">This is the About Us page</p>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
      <p className="text-gray-600">This is the Contact page</p>
    </div>
  </div>
);

const CalculatorPage: React.FC = () => {
  const [selectedDisability, setSelectedDisability] = useState('Left Arm');
  const [selectedPercentage, setSelectedPercentage] = useState('10%');
  const [selectedDependents, setSelectedDependents] = useState('0');
  const [childrenCount, setChildrenCount] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const disabilityOptions = ['Left Arm', 'Right Arm', 'Left Leg', 'Right Leg'];
  const percentageOptions = Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10}%`);
  const dependentsOptions = Array.from({ length: 6 }, (_, i) => i.toString());

  const handleCalculate = () => {
    const base = parseInt(selectedPercentage.replace('%', ''));
    const dependents = parseInt(selectedDependents);
    const children = parseInt(childrenCount) || 0;
    const total = base + (dependents * 5) + (children * 3);
    setResult(`Estimated Disability Score: ${total}%`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Veteran Disability Calculator</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Disability</label>
            <select 
              value={selectedDisability}
              onChange={(e) => setSelectedDisability(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {disabilityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Disability %</label>
            <select 
              value={selectedPercentage}
              onChange={(e) => setSelectedPercentage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {percentageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
            <select 
              value={selectedDependents}
              onChange={(e) => setSelectedDependents(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dependentsOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependent Children</label>
            <input
              type="text"
              value={childrenCount}
              onChange={(e) => setChildrenCount(e.target.value.replace(/\D/g, ''))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xl font-semibold text-blue-800 text-center">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'Male',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState<string | null>(null);

  const sexOptions = ['Male', 'Female', 'Other'];

  const handleInputChange = (field: string, value: string) => {
    if (field === 'age') {
      value = value.replace(/\D/g, '');
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
    } else if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please fill in all required fields');
    } else {
      setMessage(`Signup successful for ${formData.name}`);
      console.log('User Data:', formData);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Signup</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="text"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
            <select
              value={formData.sex}
              onChange={(e) => handleInputChange('sex', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sexOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Signup
          </button>

          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.includes('successful') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = () => {
    if (name && password) {
      setMessage(`Welcome back, ${name}!`);
    } else {
      setMessage('Please enter both fields');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Login</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Login
          </button>

          {message && (
            <div className={`p-4 rounded-lg text-center ${
              message.includes('Welcome') 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VeteranCalculatorApp;