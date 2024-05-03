import React from 'react';
import { Button } from 'react-bootstrap';

// ViewCartButton component to display a button to view the cart
const ViewCartButton = ({ onClick }) => {
  return (
    // Button to view the cart
    <Button variant="primary" onClick={onClick}>
      MY CART
    </Button>
  );
};

export default ViewCartButton;
