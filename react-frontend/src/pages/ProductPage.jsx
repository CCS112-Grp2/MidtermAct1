import React, { useState, useEffect } from 'react';
import Product from '../components/Product/Product.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import ViewCart from '../components/Cart/ViewCart.jsx';
import ViewCartButton from '../components/Cart/ViewCartButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// Import Alert from react-bootstrap

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    // Fetch product data from the API when the component mounts
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setSearchResults(data)) // Assuming the response is an array of products
      .catch(error => console.error('Error fetching products:', error));
  }, []); // Empty dependency array to only run the effect once

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

  const checkout = () => {
    setSoldItems(cartItems); // Store sold items
    setCartItems([]); // Clear cart
    setShowAlert(true); // Show alert
    setTimeout(() => {
      setShowAlert(false); // Hide alert after 3 seconds
    }, 3000);
  };

  const calculateTotalPrice = () => {
    return soldItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={3} className="p-3 bg-light">
            {/* Sidebar column */}
            <div className="sticky-top">
              <CartSummary cartItems={cartItems} />
              <div className="mb-3"></div>
              {/* Add margin */}
              <ViewCartButton onClick={toggleShowCart} />
              {showCart && (
                <div
                  className="view-cart mt-3"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  <ViewCart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                  />
                  <Button onClick={checkout} variant="primary" className="mt-3">
                    Checkout
                  </Button>
                  {/* Add checkout button */}
                </div>
              )}
            </div>
          </Col>
          <Col xs={9}>
            {/* Main content column */}
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
            <p>Sold items:</p>
            <ul>
              {soldItems.map(item => (
                <li key={item.id}>{item.name} - ${item.price}</li>
              ))}
            </ul>
            <p>Total Price: ${calculateTotalPrice()}</p>
          </div>
        </Alert>
      )}
    </>
  );
};

export default ProductPage;
