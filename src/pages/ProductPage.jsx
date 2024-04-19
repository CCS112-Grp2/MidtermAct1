import React, { useState } from 'react';
import Product from '../components/Product/Product.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import ViewCart from '../components/Cart/ViewCart.jsx';
import ViewCartButton from '../components/Cart/ViewCartButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

// Separate product data for better organization
import { products } from '../data/products.jsx'; 

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = () => {
    // Perform search logic here
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3} className="p-3 bg-light"> {/* Sidebar column */}
            <div className="sticky-top">
              <CartSummary cartItems={cartItems} />
              <div className="mb-3"></div> {/* Add margin */}
              <ViewCartButton onClick={toggleShowCart} />
              {showCart && (
                <div className="view-cart mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <ViewCart cartItems={cartItems} removeFromCart={removeFromCart} />
                </div>
              )}
            </div>
          </Col>
          <Col xs={9}> {/* Main content column */}
            <div className="product-page container">
              <header>
                <h1 className="text-center mb-4">AVAILABLE CARS</h1>
                <div className="d-flex justify-content-center mb-4">
                  <Form className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Search by car name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                  </Form>
                </div>
              </header>
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <Col key={product.id}>
                      <Product
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        imageSrc={product.imageSrc}
                        addToCart={() => addToCart(product)}
                      />
                    </Col>
                  ))
                ) : (
                  products.map(product => (
                    <Col key={product.id}>
                      <Product
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        imageSrc={product.imageSrc}
                        addToCart={() => addToCart(product)}
                      />
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;