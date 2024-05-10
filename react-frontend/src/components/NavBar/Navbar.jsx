import React, { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { RiHome2Line, RiStoreLine, RiLoginCircleLine } from 'react-icons/ri';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({ authenticated, onLogout }) => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const [loginVisible, setLoginVisible] = useState(true); // State to manage visibility of login button
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.get('http://localhost:8000/api/logout', config);
        // Set logout success alert
        setLogoutSuccess(true);
        // Hide the alert after 3 seconds
        setTimeout(() => {
          setLogoutSuccess(false);
          // Show login button after successful logout
          setLoginVisible(true);
        }, 3000);
        // Call the onLogout function passed from the parent component
        onLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Set logout error alert
      setLogoutError(true);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        setLogoutError(false);
      }, 3000);
    }
  };

  // Check if the current path is '/login' when the location changes
  useEffect(() => {
    setLogoutSuccess(false);
    setLogoutError(false);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center logo">
          <img src="https://img.freepik.com/premium-vector/eco-friendly-ride-monochrome-vectorized-symbol-advanced-ev-concept-black-emblematic-sketch_706143-47025.jpg" alt="" className="me-2" style={{ height: '30px', width: '50px' }} />
        </a>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {/* Home link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <RiHome2Line className="me-1 icon" /> HOME
              </Link>
            </li>
            {/* Conditional rendering for SHOP link */}
            {authenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  <RiStoreLine className="me-1 icon" /> SHOP
                </Link>
              </li>
            )}
          </ul>
          {/* Login/Logout link */}
          <ul className="navbar-nav">
            {loginVisible && !authenticated && location.pathname !== '/login' && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <RiLoginCircleLine className="me-1 icon" /> LOGIN
                </Link>
              </li>
            )}
            {authenticated && (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Logout alert */}
      <div className="logout-alerts">
        {logoutSuccess && (
          <div className="alert alert-success" role="alert">
            Logout successful!
          </div>
        )}
        {logoutError && (
          <div className="alert alert-danger" role="alert">
            Logout failed. Please try again later.
          </div>
        )}
      </div>
      {/* Redirect to home after successful logout */}
      {logoutSuccess && <Navigate to="/" />}
    </nav>
  );
};

export default Navbar;
