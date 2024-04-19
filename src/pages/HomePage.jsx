import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center text-white">
    <br></br><br></br><br></br><br></br>
    <h1>Welcome to GGGHI Car Dealer</h1>
    <p className="lead">BUY YOUR DREAM CAR TODAY!</p>
    <Link to="/products" className="btn btn-primary">PROCEED TO SHOPPING</Link>
  </div>
);

export default Home;
