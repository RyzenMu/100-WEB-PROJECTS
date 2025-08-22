import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const HomePage = lazy(()=> import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const MapPage = lazy(()=> import('./components/MapPage'))

function App() {
  return (
    <Router>
      <Routes>
        
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}> <HomePage /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><SignupPage /></Suspense>} />
          <Route path="/map" element={<Suspense fallback={<div>Loading...</div>}><MapPage /></Suspense>} />
        
      </Routes>
    </Router>
  );
}

export default App;
