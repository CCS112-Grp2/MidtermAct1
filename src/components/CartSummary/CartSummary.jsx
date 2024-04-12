import React, { useRef, useEffect, useState } from 'react';
import './CartSummary.css';

const CartSummary = ({ cartItems }) => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [total, setTotal] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  }, [cartItems]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`cart-summary ${isMinimized ? 'minimized' : ''}`} ref={footerRef}>
      {!isMinimized && (
        <>
          <div className="header" ref={headerRef}>
            <h2>Cart Summary</h2>
            <button className="minimize-btn" onClick={toggleMinimize}>
              Minimize
            </button>
          </div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="footer">
        Total: ${total}
      </div>
      {isMinimized && (
        <button className="maximize-btn" onClick={toggleMinimize}>
          Maximize
        </button>
      )}
    </div>
  );
};

export default CartSummary;