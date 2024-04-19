import React, { useState } from 'react';
import Product from './components/Product/Product.jsx';
import CartSummary from './components/Cart/CartSummary.jsx';
import ViewCart from './components/Cart/ViewCart.jsx';
import ViewCartButton from './components/Cart/ViewCartButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { RiShoppingCart2Line } from 'react-icons/ri'; // Importing react-icons
import './App.css';

// Separate product data for better organization
import { products } from './data/products'; 

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>Luxury Car Shop</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="product-page container">
        <header>
          <h1 className="text-center mb-4">Welcome to our Car Store</h1>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <ViewCartButton onClick={toggleShowCart} />
            <div>
              <RiShoppingCart2Line size={24} onClick={toggleShowCart} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </header>

        {showCart && <ViewCart cartItems={cartItems} removeFromCart={removeFromCart} />}

        <CartSummary cartItems={cartItems} />

        <Row xs={1} md={2} lg={3} className="g-4">
          {products.map(product => (
            <Col key={product.id}>
              <Product
                name={product.name}
                description={product.description}
                price={product.price}
                imageSrc={product.imageSrc}
                addToCart={() => addToCart(product)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ProductPage;
