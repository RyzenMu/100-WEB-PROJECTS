import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <div className="w-[100%] bg-gray-100 text-gray-800">
      {/* Add padding to inner content instead of outer container */}
      <div className="px-4 py-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
            Welcome to Photo Carousel
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Store, organize, and showcase your favorite photos in beautiful carousels.
          </p>
          
          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-3 mb-12">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">🖼️ Upload Photos</h3>
              <p className="text-sm text-gray-600">Easily upload your favorite images to your personal gallery.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">🎠 Beautiful Carousel</h3>
              <p className="text-sm text-gray-600">View your photos in an elegant, interactive carousel interface.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">🔒 Secure Storage</h3>
              <p className="text-sm text-gray-600">Your photos are safely stored and only accessible to you.</p>
            </div>
          </div>
          
          {/* CTA Section */}
          {user ? (
            <div className="bg-blue-50 p-6 rounded shadow mb-12">
              <p className="text-lg font-medium mb-4">Welcome back, <span className="text-blue-600">{user.email}</span>!</p>
              <Link
                to="/photos"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              >
                View My Photos
              </Link>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded shadow mb-12">
              <p className="text-lg font-medium mb-4">Get started by creating an account or signing in.</p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-gray-400 text-gray-800 rounded hover:bg-gray-100 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* How it works Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">How it works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Create Account',
                desc: 'Sign up with your email and password',
              },
              {
                step: '2',
                title: 'Upload Photos',
                desc: 'Add your favorite images to your personal gallery',
              },
              {
                step: '3',
                title: 'Enjoy Carousel',
                desc: 'Browse through your photos in a beautiful carousel view',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-6 rounded shadow">
                <div className="w-10 h-10 mx-auto flex items-center justify-center bg-blue-600 text-white rounded-full text-lg font-bold mb-3">
                  {step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;