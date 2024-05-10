import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', { name, email, password });
      // Registration successful
      setRegisterSuccess(true);
      // Call the onRegister function passed from the parent component
      onRegister();
    } catch (error) {
      // Handle registration errors
      console.error('Registration error:', error);
      // Display registration errors
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}>
        <div className="mb-3">
          <label htmlFor="registerName" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="registerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
      {/* Registration Success Alert */}
      {registerSuccess && (
        <div className="alert alert-success" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
