// src/Dashboard.jsx
import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { RiHomeLine, RiUserLine, RiLogoutBoxLine } from 'react-icons/ri';
import { FaUserShield } from 'react-icons/fa'; // Import logo icon
import ManageProducts from './ManageProducts.jsx';
import ManageUsers from './ManageUsers';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <FaUserShield className="logo-icon" />
          <h2>Admin Dashboard</h2>
        </div>
        <ul>
        <hr className="divider" />
          <h5>Manage</h5>
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
        </ul>
        <div className="logout">
        <hr className="divider" />
          <Link to="/" onClick={handleLogout}>
            <RiLogoutBoxLine className="icon" /> Logout
          </Link>
        </div>
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
