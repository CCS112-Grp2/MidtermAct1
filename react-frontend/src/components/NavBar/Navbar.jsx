import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Line, RiStoreLine } from 'react-icons/ri';
import './Navbar.css';

const Navbar = () => {

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
          
            {/* Shop link */}
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <RiStoreLine className="me-1 icon" /> SHOP
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
