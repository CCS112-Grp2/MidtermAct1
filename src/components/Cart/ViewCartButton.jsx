import React from 'react';
import { Button } from 'react-bootstrap';

const ViewCartButton = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      MY CART
    </Button>
  );
};

export default ViewCartButton;