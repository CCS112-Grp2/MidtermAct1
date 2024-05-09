import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

const CartSummary = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalAmount = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    setTotalPrice(totalAmount.toFixed(2));
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
