import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center text-white">
    <br></br><br></br><br></br><br></br>
    <img src="https://img.freepik.com/premium-vector/eco-friendly-ride-monochrome-vectorized-symbol-advanced-ev-concept-black-emblematic-sketch_706143-47025.jpg" alt="" className="me-2" style={{ height: '300px', width: '300px' }} />
    <h1>Welcome to GGGHI Car Dealer</h1>
    <p className="lead">BUY YOUR DREAM CAR TODAY!</p>
    <Link to="/products" className="btn btn-primary">PROCEED TO SHOPPING</Link>
  </div>
);

export default Home;
