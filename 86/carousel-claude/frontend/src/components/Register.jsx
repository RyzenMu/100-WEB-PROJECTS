import React, { useState } from 'react';

/**
 * Register component - User registration form
 * Handles user registration with email and password via backend API
 */
const Register = () => {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Handle input changes and update form state
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  /**
   * Validate form data before submission
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  /**
   * Register user via backend API
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const registerUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      // Check if response has content
      const contentType = response.headers.get('content-type');
      let data = {};

      if (contentType && contentType.includes('application/json')) {
        // Only try to parse JSON if content-type is JSON
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
      } else if (response.status >= 200 && response.status < 300) {
        // For successful responses without JSON, create a default success object
        data = { message: 'Registration successful' };
      } else {
        // For error responses without JSON
        data = { message: 'Server error occurred' };
      }

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      return data;
    } catch (error) {
      // Handle different types of errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your connection.');
      } else if (error.name === 'SyntaxError') {
        throw new Error('Server returned invalid response. Please try again.');
      } else if (error.message) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  };

  /**
   * Handle redirect to login page
   */
  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  /**
   * Handle form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Register user via backend API
      const response = await registerUser(formData.email, formData.password);

      // Show success message
      setSuccess(response.message || 'Account created successfully! You can now log in.');
      
      // Clear form
      setFormData({
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Optional: Store user data in localStorage or context
      if (response.user) {
        // localStorage.setItem('user', JSON.stringify(response.user));
        console.log('User registered:', response.user);
      }

      // Handle redirect - check if backend provides redirect URL
      if (response.redirect) {
        // Use redirect URL from backend
        setTimeout(() => {
          setSuccess('Account created successfully! Redirecting to login...');
          window.location.href = response.redirect;
        }, 2000);
      } else {
        // Fallback redirect
        setTimeout(() => {
          setSuccess('Account created successfully! Redirecting to login...');
          redirectToLogin();
        }, 2000);
      }

    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle different types of errors
      if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    // Navigate to login page
    redirectToLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join Photo Carousel to start uploading your photos</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password (min 6 characters)"
              disabled={loading}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={loading}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="px-8 pb-8 text-center border-t border-gray-100">
          <p className="text-gray-600 mt-6">
            Already have an account?{' '}
            <button 
              onClick={handleLoginClick}
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;