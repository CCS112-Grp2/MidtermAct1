

import React from 'react';

const CartSummary = ({ cartItems }) => {
  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p className="total">Total: ${cartItems.reduce((acc, item) => acc + item.price, 0)}</p>
    </div>
  );
};

export default CartSummary;