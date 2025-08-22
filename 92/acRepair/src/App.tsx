import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Lock, Wrench, CheckCircle } from 'lucide-react';

// Types
interface User {
  id?: string;
  email: string;
  full_name: string;
  phone_number: string;
  address: string;
  createdAt?: string;
}

interface RegistrationState {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone_number: string;
  address: string;
  isLoading: boolean;
  errorMessage: string | null;
  isRegistrationSuccessful: boolean;
}

// Supabase Client
const supabaseUrl = "https://vxexigrndbgzgbnbvhtr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXhpZ3JuZGJnemdibmJ2aHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjE5NjksImV4cCI6MjA1OTQ5Nzk2OX0.hTWvkU7IRnkSG-kVJVnq6cdLK2Gn8w3nSj_IQXno-Qk";
const supabase = createClient(supabaseUrl, supabaseKey);

// Auth Repository
class AuthRepository {
  async signUp(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  }

  async saveUserProfile(user: User): Promise<void> {
    const { error } = await supabase
      .from('acrepair_users')
      .insert([user]);
    if (error) throw error;
  }
}

const authRepository = new AuthRepository();

// Success Screen Component
const SuccessScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="text-center max-w-md">
      <div className="mb-8">
        <CheckCircle className="w-32 h-32 text-green-500 mx-auto animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Registration Successful!
      </h1>
      <p className="text-gray-600 text-lg">
        Welcome to CoolFix AC Repair! Please check your email to verify your account.
      </p>
    </div>
  </div>
);

// Main Registration Component
const RegistrationApp: React.FC = () => {
  const [state, setState] = useState<RegistrationState>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone_number: '',
    address: '',
    isLoading: false,
    errorMessage: null,
    isRegistrationSuccessful: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const updateField = (field: keyof RegistrationState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = (): boolean => {
    const errors: string[] = [];

    if (!state.email || !isValidEmail(state.email)) {
      errors.push('Valid email is required');
    }
    if (state.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    if (state.password !== state.confirmPassword) {
      errors.push('Passwords do not match');
    }
    if (!state.full_name.trim()) {
      errors.push('Full name is required');
    }
    if (!state.phone_number.trim()) {
      errors.push('Phone number is required');
    }
    if (!state.address.trim()) {
      errors.push('Address is required');
    }

    setState(prev => ({ 
      ...prev, 
      errorMessage: errors.length > 0 ? errors.join('\n') : null 
    }));
    return errors.length === 0;
  };

  const registerUser = async () => {
    if (!isFormValid()) return;

    setState(prev => ({ ...prev, isLoading: true, errorMessage: null }));

    try {
      // First, create auth user
      await authRepository.signUp(state.email, state.password);

      // Then save user profile
      const user: User = {
        email: state.email,
        full_name: state.full_name,
        phone_number: state.phone_number,
        address: state.address,
      };

      await authRepository.saveUserProfile(user);

      setState(prev => ({
        ...prev,
        isLoading: false,
        isRegistrationSuccessful: true,
      }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        errorMessage: `Registration failed: ${error.message}`,
      }));
    }
  };

  if (state.isRegistrationSuccessful) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Wrench className="w-20 h-20 text-blue-600 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            CoolFix AC Repair
          </h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={state.full_name}
              onChange={(e) => updateField('full_name', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={state.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={state.phone_number}
              onChange={(e) => updateField('phone_number', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Address */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              placeholder="Address"
              value={state.address}
              onChange={(e) => updateField('address', e.target.value)}
              rows={3}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={state.password}
              onChange={(e) => updateField('password', e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {passwordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {confirmPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {state.errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm whitespace-pre-line">
                {state.errorMessage}
              </p>
            </div>
          )}

          {/* Register Button */}
          <button
            onClick={registerUser}
            disabled={state.isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {state.isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Account'
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-sm text-gray-500 mt-4">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationApp;