import React, { useState, useEffect } from 'react';
import Product from '../components/Product/Product.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import ViewCart from '../components/Cart/ViewCart.jsx';
import ViewCartButton from '../components/Cart/ViewCartButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Fetch product data from the API when the component mounts
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
    const results = searchResults.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const checkout = () => {
    // Show alert and clear cart after a delay
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setCartItems([]);
    }, 3000);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3} className="p-3 bg-light">
            <div className="sticky-top">
              <CartSummary cartItems={cartItems} />
              <div className="mb-3"></div>
              <ViewCartButton onClick={toggleShowCart} />
              {showCart && (
                <div className="view-cart mt-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <ViewCart cartItems={cartItems} removeFromCart={removeFromCart} />
                  <Button onClick={checkout} variant="primary" className="mt-3">
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </Col>
          <Col xs={9}>
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
                    <Button variant="primary" onClick={handleSearch}>
                      Search
                    </Button>
                  </Form>
                </div>
              </header>
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
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
                  <p>No products found</p>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      {showAlert && (
        <Alert variant="success" className="position-fixed top-50 start-50 translate-middle">
          <div>
            <p>Checkout successful!</p>
            <CartSummary cartItems={cartItems} />
          </div>
        </Alert>
      )}
    </>
  );
};

export default ProductPage;
