import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Mock components for demonstration
const Home = ({ user }) => <div>Home Component - User: {user?.email || 'Not logged in'}</div>;
const Register = () => <div>Register Component</div>;
const PhotoUpload = ({ user }) => <div>Photo Upload - User: {user?.email}</div>;
const PhotoGallery = ({ user }) => <div>Photo Gallery - User: {user?.email}</div>;

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  
  // Ref to prevent multiple simultaneous auth checks
  const authCheckingRef = useRef(false);
  const interceptorRef = useRef(null);

  // Memoized auth check to prevent recreation on every render
  const checkAuthStatus = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (authCheckingRef.current) {
      return;
    }
    
    authCheckingRef.current = true;
    
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setUser(null);
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      const response = await axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setUser(response.data.user);
    } catch (error) {
      console.log('Auth check failed:', error.response?.status);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
      }
      
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
      authCheckingRef.current = false;
    }
  }, []);

  // Initial auth check - only run once
  useEffect(() => {
    if (!authChecked) {
      checkAuthStatus();
    }
  }, [checkAuthStatus, authChecked]);

  // Memoized login handler
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    
    if (userData.token) {
      localStorage.setItem('authToken', userData.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    }
  }, []);

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axios.post('/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Setup axios interceptor - only once and with cleanup
  useEffect(() => {
    // Clean up existing interceptor if any
    if (interceptorRef.current !== null) {
      axios.interceptors.response.eject(interceptorRef.current);
    }

    const token = localStorage.getItem('authToken');
    if (token && !axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Create new interceptor
    interceptorRef.current = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Only handle 401 errors if we currently have a user
        if (error.response?.status === 401 && user) {
          console.log('Token expired, logging out');
          
          // Clear auth data
          localStorage.removeItem('authToken');
          delete axios.defaults.headers.common['Authorization'];
          
          // Set user to null, but prevent additional auth checks
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      if (interceptorRef.current !== null) {
        axios.interceptors.response.eject(interceptorRef.current);
        interceptorRef.current = null;
      }
    };
  }, [user]); // Only depend on user state

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading...</p>
      </div>
    );
  }

  // Photos component
  const Photos = ({ user }) => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Photos</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Upload Photos</h3>
          <PhotoUpload user={user} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Photo Gallery</h3>
          <PhotoGallery user={user} />
        </div>
      </div>
    </div>
  );

  // Improved Login component wrapper
  const LoginWrapper = () => {
    const [localLoading, setLocalLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLocalLoading(true);
      setError('');

      try {
        const response = await axios.post('/api/login', formData);
        handleLogin(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLocalLoading(false);
      }
    };

    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={localLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {localLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-semibold text-gray-900">Photo Carousel App</h1>
              {user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/register"
              element={user ? <Navigate to="/photos" replace /> : <Register />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/photos" replace /> : <LoginWrapper />}
            />
            <Route
              path="/photos"
              element={user ? <Photos user={user} /> : <Navigate to="/login" replace />}
            />
            <Route 
              path="/upload" 
              element={user ? <PhotoUpload user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/gallery" 
              element={user ? <PhotoGallery user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;