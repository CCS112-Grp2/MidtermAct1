import React from 'react';

const AddToCartButton = ({ onClick }) => {
  return (
    <button className="add-to-cart-btn" onClick={onClick}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
