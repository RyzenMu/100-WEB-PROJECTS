import React, { useState, useEffect } from 'react';
import { Upload, Trash2, FolderOpen, LogOut, User, Camera, Home } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

const PhotoUploadApp = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [photos, setPhotos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [uploadFolder, setUploadFolder] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Auth forms state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && currentPage === 'photos') {
      fetchPhotos();
      fetchFolders();
    }
  }, [user, currentPage, selectedFolder]);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/user`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCurrentPage('photos');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginForm)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCurrentPage('photos');
        setMessage('Login successful!');
        setLoginForm({ email: '', password: '' });
      } else {
        const error = await response.json();
        setMessage(error.error || 'Login failed');
      }
    } catch (error) {
      setMessage('Login failed');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setMessage('Please fill in all fields');
      return;
    }

    if (registerForm.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(registerForm)
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCurrentPage('photos');
        setMessage('Registration successful!');
        setRegisterForm({ name: '', email: '', password: '' });
      } else {
        const error = await response.json();
        setMessage(error.error || 'Registration failed');
      }
    } catch (error) {
      setMessage('Registration failed');
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      setCurrentPage('home');
      setPhotos([]);
      setFolders([]);
      setMessage('Logged out successfully');
    } catch (error) {
      setMessage('Logout failed');
    }
  };

  const fetchPhotos = async () => {
    try {
      const url = selectedFolder 
        ? `${API_BASE}/api/photos?folder=${selectedFolder}`
        : `${API_BASE}/api/photos`;
      
      const response = await fetch(url, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos);
      }
    } catch (error) {
      console.error('Failed to fetch photos:', error);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/folders`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setFolders(data.folders);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }
  };

  const handlePhotoUpload = async (file, folder) => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select a valid image file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setMessage('File size must be less than 10MB');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('folder', folder || 'default');

    try {
      const response = await fetch(`${API_BASE}/api/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        setMessage('Photo uploaded successfully!');
        setUploadFolder('');
        fetchPhotos();
        fetchFolders();
      } else {
        const error = await response.json();
        setMessage(error.error || 'Upload failed');
      }
    } catch (error) {
      setMessage('Upload failed');
    }
    setLoading(false);
  };

  const handleDeletePhoto = async (photoId, photoName) => {
    if (!window.confirm(`Are you sure you want to delete "${photoName}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/photos/${photoId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setMessage('Photo deleted successfully');
        fetchPhotos();
        fetchFolders();
      } else {
        const error = await response.json();
        setMessage(error.error || 'Delete failed');
      }
    } catch (error) {
      setMessage('Delete failed');
    }
    setLoading(false);
  };

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Camera className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">PhotoVault</h1>
          <p className="text-gray-600 mt-2">Store and organize your private photos securely</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => {
              setCurrentPage('login');
              setMessage('');
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
          
          <button
            onClick={() => {
              setCurrentPage('register');
              setMessage('');
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => {
              setCurrentPage('home');
              setMessage('');
            }}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setCurrentPage('register');
              setMessage('');
            }}
            className="text-indigo-600 hover:text-indigo-700 text-sm"
          >
            Don't have an account? Register here
          </button>
        </div>
      </div>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => {
              setCurrentPage('home');
              setMessage('');
            }}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-4"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Join PhotoVault today</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a password (min 6 characters)"
              onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setCurrentPage('login');
              setMessage('');
            }}
            className="text-indigo-600 hover:text-indigo-700 text-sm"
          >
            Already have an account? Sign in here
          </button>
        </div>
      </div>
    </div>
  );

  const PhotosPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">PhotoVault</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:block">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successful') 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload Photos
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handlePhotoUpload(file, uploadFolder);
                      e.target.value = '';
                    }
                  }}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Max size: 10MB. Formats: JPG, PNG, GIF, WebP</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder (optional)
                </label>
                <input
                  type="text"
                  value={uploadFolder}
                  onChange={(e) => setUploadFolder(e.target.value)}
                  placeholder="Enter folder name or leave empty for default"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Organize your photos by creating folders</p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <span className="ml-2 text-indigo-600">Uploading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Folder Filter */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FolderOpen className="h-5 w-5 mr-2" />
            Filter by Folder
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFolder('')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                selectedFolder === '' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Photos ({photos.length})
            </button>
            
            {folders.map((folder) => {
              const folderCount = photos.filter(p => p.folder === folder).length;
              return (
                <button
                  key={folder}
                  onClick={() => setSelectedFolder(folder)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                    selectedFolder === folder 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {folder} ({folderCount})
                </button>
              );
            })}
          </div>
        </div>

        {/* Photos Grid */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Photos {selectedFolder && `in "${selectedFolder}"`}
          </h2>
          
          {photos.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">
                {selectedFolder 
                  ? `No photos found in "${selectedFolder}" folder` 
                  : 'No photos uploaded yet'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Upload your first photo to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                  <div className="aspect-square relative">
                    <img
                      src={photo.url}
                      alt={photo.filename}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay with delete button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-200 flex items-center justify-center">
                      <button
                        onClick={() => handleDeletePhoto(photo.id, photo.filename)}
                        disabled={loading}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white p-2 rounded-full transition duration-200"
                        title={`Delete ${photo.filename}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate" title={photo.filename}>
                      {photo.filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {photo.folder} • {(photo.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(photo.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Render appropriate page
  if (user) {
    return <PhotosPage />;
  }

  switch (currentPage) {
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegisterPage />;
    default:
      return <HomePage />;
  }
};

export default PhotoUploadApp;