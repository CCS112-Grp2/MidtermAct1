import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Product.css';

const Product = ({ name, description, price, imageSrc, addToCart }) => {
  return (
    <Card className="product">
      <Card.Img variant="top" src={imageSrc} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text className="price">${price}</Card.Text>
        <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
