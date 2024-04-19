import React from 'react';
import './AddToCartButton.css';
import { Button } from 'react-bootstrap';

const AddToCartButton = ({ onClick }) => {
  return (
    <Button className="add-to-cart-btn" onClick={onClick}>Add to Cart</Button>
  );
};

export default AddToCartButton;
