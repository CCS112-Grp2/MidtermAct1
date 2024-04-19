import React from 'react';
import { Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

const ViewCart = ({ cartItems, removeFromCart }) => {
  return (
    <Container className="view-cart">
      {cartItems.length === 0 ? (
        <p className="italic">Your cart is empty</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row className="align-items-center">
                <Col>{item.name} - ${item.price}</Col>
                <Col xs="auto">
                  <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ViewCart;
