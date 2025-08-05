import React, { useState, useEffect, createContext, useContext } from 'react';
import { Search, MapPin, Clock, Heart, Briefcase, Zap, CheckCircle, User, LogOut } from 'lucide-react';

// Auth Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        credentials: 'include', // Important for session cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.log('No active session found');
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Clear user state immediately for better UX
      setUser(null);
      
      // Then make the API call to clear server session
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      // User is already set to null above
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    company: "TechCorp Solutions",
    role: "Full Stack Developer",
    experience: "2-4 years",
    salary: "₹8-12 LPA",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "Express"],
    location: "Bangalore",
    posted: "2 days ago"
  },
  {
    id: 2,
    company: "DataFlow Systems",
    role: "Frontend Developer",
    experience: "1-3 years",
    salary: "₹6-10 LPA",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    location: "Mumbai",
    posted: "1 day ago"
  },
  {
    id: 3,
    company: "CloudTech Innovations",
    role: "Backend Developer",
    experience: "3-5 years",
    salary: "₹10-15 LPA",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    location: "Hyderabad",
    posted: "3 days ago"
  },
  {
    id: 4,
    company: "WebCraft Studios",
    role: "React Developer",
    experience: "2-4 years",
    salary: "₹7-11 LPA",
    skills: ["React", "JavaScript", "CSS", "Supabase", "Git"],
    location: "Pune",
    posted: "1 day ago"
  },
  {
    id: 5,
    company: "DevOps Masters",
    role: "DevOps Engineer",
    experience: "4-6 years",
    salary: "₹12-18 LPA",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Python"],
    location: "Delhi",
    posted: "4 days ago"
  },
  {
    id: 6,
    company: "Mobile First Tech",
    role: "Full Stack Engineer",
    experience: "3-5 years",
    salary: "₹9-14 LPA",
    skills: ["Node.js", "Express", "React", "MongoDB", "GraphQL"],
    location: "Chennai",
    posted: "2 days ago"
  },
  {
    id: 7,
    company: "AI Solutions Hub",
    role: "Software Developer",
    experience: "1-2 years",
    salary: "₹5-8 LPA",
    skills: ["Java", "Spring Boot", "MySQL", "REST APIs", "Git"],
    location: "Bangalore",
    posted: "5 days ago"
  },
  {
    id: 8,
    company: "Frontend Experts",
    role: "UI/UX Developer",
    experience: "2-3 years",
    salary: "₹6-9 LPA",
    skills: ["HTML", "CSS", "JavaScript", "Figma", "React"],
    location: "Noida",
    posted: "3 days ago"
  },
  {
    id: 9,
    company: "Database Dynamics",
    role: "Database Developer",
    experience: "4-7 years",
    salary: "₹11-16 LPA",
    skills: ["PostgreSQL", "MySQL", "Python", "ETL", "SQL"],
    location: "Kolkata",
    posted: "1 week ago"
  },
  {
    id: 10,
    company: "Startup Accelerator",
    role: "Junior Developer",
    experience: "0-2 years",
    salary: "₹4-7 LPA",
    skills: ["JavaScript", "HTML", "CSS", "Node.js", "MongoDB"],
    location: "Gurgaon",
    posted: "2 days ago"
  }
];

// Header Component
const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setCurrentPage('home'); // Redirect to home page after logout
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-xl font-bold text-blue-400">JobConnect</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                <button
                  onClick={() => setCurrentPage('jobs')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'jobs' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Jobs
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white">{user.username || user.first_name || user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentPage('login')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 'login' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === 'register' 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-600 text-white hover:border-blue-500 hover:text-blue-400'
                  }`}
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

// Homepage Component
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            One Stop Job Search
          </h1>
          <p className="text-2xl text-gray-400 mb-4">
            Discover Your Next Career Opportunity
          </p>
          <div className="flex items-center justify-center space-x-2 text-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">5 Million Jobs</span>
            <span className="text-gray-400">available in India</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Tech Jobs</h3>
            <p className="text-gray-400">Find opportunities in software development, web development, and emerging technologies.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Fast Matching</h3>
            <p className="text-gray-400">Our AI-powered system matches you with relevant job opportunities instantly.</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Verified Companies</h3>
            <p className="text-gray-400">All our partner companies are verified and trusted by thousands of professionals.</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of professionals who found their dream jobs through JobConnect
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">50K+</div>
              <div className="text-gray-400">Jobs Posted</div>
            </div>
            <div className="w-px bg-gray-700 mx-8"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">25K+</div>
              <div className="text-gray-400">Success Stories</div>
            </div>
            <div className="w-px bg-gray-700 mx-8"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1000+</div>
              <div className="text-gray-400">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component
const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        setCurrentPage('jobs');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    if (provider === 'Google') {
      window.location.href = 'http://localhost:5000/auth/google';
    } else if (provider === 'Facebook') {
      window.location.href = 'http://localhost:5000/auth/facebook';
    } else {
      alert(`${provider} OAuth integration not yet implemented`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your JobConnect account</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors"
              >
                <span>Google</span>
              </button>

              <button
                onClick={() => handleOAuthLogin('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors"
              >
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('register')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Register Component
const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.username || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please login to continue.');
        setFormData({
          username: '',
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        });
        setTimeout(() => {
          setCurrentPage('login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    if (provider === 'Google') {
      window.location.href = 'http://localhost:5000/auth/google';
    } else if (provider === 'Facebook') {
      window.location.href = 'http://localhost:5000/auth/facebook';
    } else {
      alert(`${provider} OAuth integration not yet implemented`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join JobConnect to find your dream job</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Create a password (min. 6 characters)"
                required
                minLength={6}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors"
              >
                <span>Google</span>
              </button>

              <button
                onClick={() => handleOAuthLogin('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-900 hover:bg-gray-700 text-white transition-colors opacity-50 cursor-not-allowed"
                disabled
              >
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Jobs Page Component
const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const allSkills = [...new Set(mockJobs.flatMap(job => job.skills))].sort();

  useEffect(() => {
    let filtered = mockJobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkill) {
      filtered = filtered.filter(job => 
        job.skills.includes(selectedSkill)
      );
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedSkill]);

  const JobCard = ({ job }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{job.role}</h3>
          <p className="text-blue-400 font-medium">{job.company}</p>
        </div>
        <div className="text-right">
          <p className="text-green-400 font-semibold">{job.salary}</p>
          <p className="text-gray-400 text-sm">{job.posted}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          {job.experience}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-600/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-600 hover:border-blue-500 text-white hover:text-blue-400 rounded-lg transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Find Your Dream Job</h1>
          <p className="text-gray-400">Discover {filteredJobs.length} job opportunities waiting for you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Search Jobs
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by role, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Filter by Skill
              </label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Results */}
        <div className="grid gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-gray-400">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Inner App Component that uses auth context
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading, checkAuthStatus } = useAuth();

  // Check for OAuth success on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = window.location.pathname;
    
    // If we're on the jobs page and not authenticated, check auth status
    if (currentUrl === '/jobs' || urlParams.get('oauth_success')) {
      checkAuthStatus().then(() => {
        if (currentUrl === '/jobs') {
          setCurrentPage('jobs');
        }
      });
    }
  }, [checkAuthStatus]);

  // Redirect authenticated users trying to access auth pages
  useEffect(() => {
    if (user && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('jobs');
    }
  }, [user, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'jobs':
        return user ? <JobsPage /> : <Login setCurrentPage={setCurrentPage} />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

// Main App Component that provides auth context
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;