import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage';
import Login from './pages/Login';
import Crud from './pages/Crud'; // Import the Crud component
import './css/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="app-container gradient-bg">
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated} />} />
          <Route path="/products" element={<ProductPage />} />
          {!authenticated ? (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          ) : (
            <Route path="/login" element={<Navigate to="/" />} />
          )}
          <Route path="/register" element={<RegistrationPage />} />
          {/* New route for the Crud component */}
          {authenticated && (
            <Route path="/edit" element={<Crud />} />
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
