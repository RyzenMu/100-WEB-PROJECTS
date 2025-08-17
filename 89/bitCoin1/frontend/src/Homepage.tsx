import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, TrendingUp, Shield, Zap, Globe } from 'lucide-react';

export default function BitcoinHomepage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess('Account created successfully! Welcome to Bitcoin trading!');
      console.log(formData)
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setLoading(false);
    }, 1500);
  };

  const handleLogin = async () => {
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please enter email and password');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setSuccess('Login successful! Redirecting to dashboard...');
      setLoading(false);
      setShowLogin(false);
    }, 1500);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="bitcoin-icon">₿</div>
            <span className="logo-text">BitcoinPro</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">Features</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">About</a>
            <button 
              onClick={() => setShowLogin(true)}
              className="login-btn"
            >
              <LogIn size={18} />
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="main">
        <div className="hero-background">
          <div className="bitcoin-pattern"></div>
        </div>
        
        <div className="content-wrapper">
          {/* Left side - Hero Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              Trade Bitcoin Like a 
              <span className="gradient-text"> Pro</span>
            </h1>
            <p className="hero-subtitle">
              Join millions of traders worldwide. Start your Bitcoin journey with 
              advanced tools, real-time analytics, and secure trading.
            </p>
            
            <div className="features-grid">
              <div className="feature-item">
                <Shield className="feature-icon" />
                <div>
                  <h3>Secure Trading</h3>
                  <p>Bank-level security</p>
                </div>
              </div>
              <div className="feature-item">
                <Zap className="feature-icon" />
                <div>
                  <h3>Lightning Fast</h3>
                  <p>Instant transactions</p>
                </div>
              </div>
              <div className="feature-item">
                <Globe className="feature-icon" />
                <div>
                  <h3>Global Access</h3>
                  <p>Trade from anywhere</p>
                </div>
              </div>
              <div className="feature-item">
                <TrendingUp className="feature-icon" />
                <div>
                  <h3>Advanced Analytics</h3>
                  <p>Professional tools</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Registration Form */}
          <div className="form-container">
            <div className="register-form">
              <div className="form-header">
                <h2>Start Trading Today</h2>
                <p>Create your account in seconds</p>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                onClick={handleRegister}
                className="register-btn"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="form-footer">
                By signing up, you agree to our 
                <a href="#" className="link"> Terms of Service</a> and 
                <a href="#" className="link"> Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Welcome Back</h3>
              <button 
                onClick={() => setShowLogin(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button 
              onClick={handleLogin}
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .homepage {
          min-height: 100vh;
          background: #0a0b0d;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }

        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(10, 11, 13, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 100;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bitcoin-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #f7931a;
        }

        .login-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(247, 147, 26, 0.3);
        }

        .main {
          position: relative;
          min-height: 100vh;
          padding-top: 70px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0b0d 0%, #1a1b23 50%, #0a0b0d 100%);
          overflow: hidden;
        }

        .bitcoin-pattern {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: radial-gradient(circle at 20% 50%, rgba(247, 147, 26, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(247, 147, 26, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, rgba(255, 179, 71, 0.08) 0%, transparent 50%);
          animation: rotate 60s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .content-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: calc(100vh - 70px);
        }

        .hero-content {
          z-index: 2;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature-icon {
          color: #f7931a;
          flex-shrink: 0;
        }

        .feature-item h3 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .feature-item p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .form-container {
          z-index: 2;
        }

        .register-form {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          color: rgba(255, 255, 255, 0.7);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .form-group input {
          width: 100%;
          padding: 16px 20px 16px 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          transition: all 0.2s;
        }

        .form-group input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .form-group input:focus {
          outline: none;
          border-color: #f7931a;
          box-shadow: 0 0 0 3px rgba(247, 147, 26, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 4px;
        }

        .password-toggle:hover {
          color: #f7931a;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .success-message {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
        }

        .register-btn {
          width: 100%;
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          border: none;
          padding: 16px;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 20px;
        }

        .register-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(247, 147, 26, 0.3);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .form-footer {
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
        }

        .link {
          color: #f7931a;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: rgba(26, 27, 35, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 400px;
          margin: 20px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .close-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 24px;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }

        .close-btn:hover {
          color: white;
        }

        .login-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #f7931a 0%, #ffb347 100%);
          border: none;
          padding: 16px;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .login-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(247, 147, 26, 0.3);
        }

        .login-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px 20px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .nav {
            gap: 16px;
          }

          .nav-link {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}