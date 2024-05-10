import React, { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import RegistrationForm from './Registration';

const Login = ({ onLogin, authenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { token } = response.data;

      // Store token in localStorage or session storage
      localStorage.setItem('token', token);

      // Call the onLogin function passed from the parent component
      onLogin();
    } catch (error) {
      // Handle errors, such as displaying validation errors or server errors
      if (error.response && error.response.status === 401) {
        // Unauthorized - Invalid credentials
        setErrors({ email: ['Invalid email or password'], password: ['Invalid email or password'] });
      } else {
        // Other errors
        console.error('Login error:', error);
        // Show login error alert
        setLoginError(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
              {loginError && (
                <div className="alert alert-danger" role="alert">
                  Login failed. Please try again.
                </div>
              )}
              {/* Render the form only if not authenticated */}
              {!authenticated && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                  </div>
                  <div className="d-grid mb-5">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-link" onClick={() => setShowRegisterForm(true)}>Register</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {showRegisterForm && <RegistrationForm onRegister={() => setShowRegisterForm(false)} />}
    </div>
  );
};

export default Login;
