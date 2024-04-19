// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center text-white">
    <h1>Welcome to Our Store</h1>
    <p className="lead">Discover our amazing products and start shopping today!</p>
    <Link to="/products" className="btn btn-primary">View Products</Link>
  </div>
);

export default Home;
