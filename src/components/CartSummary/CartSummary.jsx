import React, { useRef, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
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
      <div className="add-to-cart-summary">
        <p>{cartItems.length} Item(s) in Cart</p>
      </div>
      {!isMinimized && (
        <>
          <div className="header" ref={headerRef}>
            <h2>Cart Summary</h2>
            <Button variant="secondary" onClick={toggleMinimize}>
              Minimize
            </Button>
          </div>
          <ListGroup>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.name} - ${item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="footer">
            Total: ${total}
          </div>
        </>
      )}
      {isMinimized && (
        <Button variant="secondary" onClick={toggleMinimize}>
          Maximize
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
