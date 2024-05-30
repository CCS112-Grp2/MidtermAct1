import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table, Modal, Alert } from "react-bootstrap";
import "./Crud.css"; // Ensure this path is correct

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", imageSrc: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/products/view", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/api/products/${editProduct.id}`, editProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setEditProduct(null);
      setShowEditModal(false);
      setAlertMessage("Product updated successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/products/add", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setNewProduct({ name: "", description: "", price: "", imageSrc: "" });
      setShowNewModal(false);
      setAlertMessage("Product added successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setAlertMessage("Product deleted successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Manage Products</h1>
          {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
          <Button variant="primary" onClick={() => setShowNewModal(true)}>Add New Product</Button>
          <div className="table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <Button variant="warning" onClick={() => { setEditProduct(product); setShowEditModal(true); }}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={editProduct.name} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={editProduct.description} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="price" value={editProduct.price} onChange={handleEditChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* New Product Modal */}
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewProductSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={newProduct.price} onChange={handleNewProductChange} />
            </Form.Group>
            <Form.Group controlId="formImageSrc">
              <Form.Label>Image Source</Form.Label>
              <Form.Control type="text" name="imageSrc" value={newProduct.imageSrc} onChange={handleNewProductChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageProducts;
