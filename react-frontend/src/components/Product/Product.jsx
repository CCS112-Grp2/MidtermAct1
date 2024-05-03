import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Product.css';

const Product = ({ name, description, price, imageSrc, addToCart }) => {
  return (
    <Card className="product">
      <Card.Img variant="top" src={imageSrc} alt={name} />
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text className="description">{description}</Card.Text>
          <Card.Text className="price"><strong>${price}</strong></Card.Text> {/* Make the price bold */}
        </div>
        <Button variant="primary" onClick={addToCart} className="mt-auto">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
