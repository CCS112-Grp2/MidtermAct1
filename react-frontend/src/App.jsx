import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard component
import './css/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setAuthenticated(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setRole(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Clear the token on initial load
    localStorage.removeItem('token');
    setAuthenticated(false);
    setRole(null);
  }, []);

  return (
    <Router>
      <div className="app-container gradient-bg">
        {(!authenticated || role !== 'admin') && <Navbar authenticated={authenticated} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated} />} />
          <Route path="/products" element={<ProductPage />} />
          {!authenticated ? (
            <Route path="/login" element={<Login onLogin={handleLogin} authenticated={authenticated} />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}
          <Route path="/register" element={<RegistrationPage />} />
          {authenticated && role === 'admin' && (
            <Route path="/dashboard/*" element={<Dashboard onLogout={handleLogout} />} />
          )}
          {authenticated && role !== 'admin' && (
            <Route path="/edit" element={<Navigate to="/" />} /> // Redirect to home for non-admins
          )}
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 GGGHI Car Dealer. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
