import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage'; // Import the new RegistrationPage component
import Login from './pages/Login';
import './css/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Handle successful login, set authenticated state to true
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Handle logout, set authenticated state to false
    setAuthenticated(false);
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app-container gradient-bg">
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
        <Routes>
          {/* Conditionally render Home based on authentication status */}
          <Route path="/" element={<Home authenticated={authenticated} />} />
          <Route path="/products" element={<ProductPage />} />
          {/* Render login page only if not authenticated */}
          {!authenticated ? (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}
          <Route path="/register" element={<RegistrationPage />} /> {/* Route to the RegistrationPage component */}
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 GGGHI Car Dealer. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
