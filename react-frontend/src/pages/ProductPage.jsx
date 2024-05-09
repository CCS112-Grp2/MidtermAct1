import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product/Product.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import ViewCart from '../components/Cart/ViewCart.jsx';
import ViewCartButton from '../components/Cart/ViewCartButton.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';
import '../css/ProductPage.css';

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showAlert, setShowAlert] = useState({ success: false, message: '' });
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [showShippingModal, setShowShippingModal] = useState(false);

  useEffect(() => {
    // Fetch product data from the API when the component mounts
    fetch('http://localhost:8000/api/products')
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      // If the product is already in the cart, increase its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with quantity 1
      fetch('http://localhost:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.message === 'Product added to cart successfully') {
          console.log('Product added to cart successfully');
          // Update the cart items state here
          setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
        } else {
          console.error('Unexpected response from server:', data.message);
        }
      })
      .catch(error => {
        console.error('Error adding product to cart:', error.message);
      });
    }
  };
  
  
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Fetch product data from the API when the component mounts
        fetch('http://localhost:8000/api/products')
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error('Error fetching products:', error));
    } else {
      // Filter products based on search query
      const results = searchResults.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleShippingSubmit = () => {
    axios.post('http://localhost:8000/api/users', {
      name: shippingDetails.name,
      address: shippingDetails.address,
      city: shippingDetails.city,
      postal_code: shippingDetails.postalCode // Use 'postal_code' as per the Laravel model
    })
    .then(response => {
      if (response.data.message === 'User created successfully') {
        setShowAlert({ success: true, message: 'Checkout successful!' });
        setShowShippingModal(false);
        setTimeout(() => {
          setShowAlert(false);
          setShippingDetails({
            name: '',
            address: '',
            city: '',
            postalCode: ''
          });
          setCartItems([]);
        }, 3000);
      } else {
        throw new Error('Unexpected response from server');
      }
    })
    .catch(error => {
      setShowAlert({ success: false, message: 'Error saving checkout details. Please try again.' });
      console.error('Error saving checkout details:', error);
    });
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
                  <ViewCart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                  <Button onClick={() => setShowShippingModal(true)} variant="primary" className="mt-3">
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
      <Modal
        show={showShippingModal}
        onHide={() => setShowShippingModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Shipping Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col xs={6}>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <CartSummary cartItems={cartItems} />
                  <ViewCart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                </div>
              </Col>
              <Col xs={6}>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={shippingDetails.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your city"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPostalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your postal code"
                      name="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowShippingModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShippingSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert.success && (
        <Alert variant="success" className="position-fixed top-50 start-50 translate-middle">
          <div>
            <p>{showAlert.message}</p>
            {showAlert.success && <CartSummary cartItems={cartItems} />}
          </div>
        </Alert>
      )}
    </>
  );
};

export default ProductPage;
