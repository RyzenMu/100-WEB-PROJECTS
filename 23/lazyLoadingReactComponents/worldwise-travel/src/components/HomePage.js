import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to WorldWise Travel</h1>
      <p>Explore the world with us!</p>
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/signup">Sign Up</Link> | 
        <Link to="/map">Explore the Map</Link>
      </nav>
    </div>
  );
}

export default HomePage;
