<<<<<<< Updated upstream
// ViewCartButton.jsx
=======
>>>>>>> Stashed changes
import React from 'react';
import { Button } from 'react-bootstrap';

const ViewCartButton = ({ onClick }) => {
  return (
    <Button variant="primary" onClick={onClick}>
      View Cart
    </Button>
  );
};

export default ViewCartButton;