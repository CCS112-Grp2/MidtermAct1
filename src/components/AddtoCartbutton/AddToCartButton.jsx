import React from 'react';
import './AddtoCartButton.css';

const AddToCartButton = ({ onClick }) => {
  return (
    <button className="add-to-cart-btn" onClick={onClick}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
