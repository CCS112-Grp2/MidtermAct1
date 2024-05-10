import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ authenticated }) => (
  <div className="container text-center text-white">
    <br></br><br></br><br></br><br></br>
    <img src="https://img.freepik.com/premium-vector/eco-friendly-ride-monochrome-vectorized-symbol-advanced-ev-concept-black-emblematic-sketch_706143-47025.jpg" alt="" className="me-2" style={{ height: '300px', width: '300px' }} />
    <h1>Welcome to GGGHI Car Dealer</h1>
    <p className="lead">BUY YOUR DREAM CAR TODAY!</p>
    {authenticated ? (
      <Link to="/products" className="btn btn-primary">PROCEED TO SHOPPING</Link>
    ) : (
      <Link to="/login" className="btn btn-primary">LOGIN</Link>
    )}
  </div>
);

export default Home;
