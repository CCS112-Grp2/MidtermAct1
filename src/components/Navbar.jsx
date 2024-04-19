import React from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine, RiStoreLine } from 'react-icons/ri'; // Importing icons from react-icons
import './css/Navbar.css'; // Import CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center logo" to="/">
          <img src="https://static.vecteezy.com/system/resources/previews/012/255/326/non_2x/auto-style-car-logo-design-with-sports-vehicle-icon-silhouette-concept-on-white-background-illustration-vector.jpg" alt="" className="me-2" style={{ height: '30px', width: '50px' }} />
          Car Store
        </Link>

        {/* Navbar toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {/* Shop link */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <RiStoreLine className="me-1 icon" /> Shop
              </Link>
            </li>

            {/* My Cart link */}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <RiShoppingCartLine className="me-1 icon" /> My Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
