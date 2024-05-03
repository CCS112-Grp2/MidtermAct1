import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

const CartSummary = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total whenever cartItems change
  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(totalAmount);
  }, [cartItems]);

  return (
    <div className="cart-summary mt-4 p-3 border rounded">
      <h4>Cart Summary</h4>
      <p>
        <Badge bg="secondary">{cartItems.length}</Badge> Item(s) in Cart
      </p>
      <p>Total: ${totalPrice}</p>
    </div>
  );
};

export default CartSummary;
