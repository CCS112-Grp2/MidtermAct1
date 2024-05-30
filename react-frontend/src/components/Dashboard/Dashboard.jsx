import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { RiHomeLine, RiUserLine, RiLogoutBoxLine, RiArrowDownSLine } from 'react-icons/ri';
import ManageProducts from './ManageProducts.jsx';
import ManageUsers from './ManageUsers';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    // Call the onLogout function passed from the parent component
    onLogout();
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to home after logout
    navigate('/'); // Use navigate to redirect to the home page
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="manage-products">
              <RiHomeLine className="icon" /> Manage Products
            </Link>
          </li>
          <li>
            <Link to="manage-users">
              <RiUserLine className="icon" /> Manage Users
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <RiLogoutBoxLine className="icon" /> Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="manage-products" />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
