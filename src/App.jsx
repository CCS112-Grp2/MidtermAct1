// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container gradient-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
        <footer className="footer">
          <p>&copy; 2024 Your Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
