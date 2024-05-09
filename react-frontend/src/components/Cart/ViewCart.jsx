import React from 'react';
import { Button, ListGroup, Container, Form } from 'react-bootstrap';

const ViewCart = ({ cartItems, removeFromCart, updateQuantity }) => {
  return (
    <Container className="view-cart">
      {cartItems && cartItems.length === 0 ? (
        <p className="italic">Your cart is currently empty.</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <div>{item.name}</div>
                <div>Price: ${parseFloat(item.price).toFixed(2)}</div>
                <div>Total Price: {(item.price * item.quantity).toFixed(2)}</div>
              </div>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  placeholder="1"
                  className="form-control-sm"
                />
                <Button variant="danger" onClick={() => removeFromCart(index)} className="ms-2">Remove</Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ViewCart;
