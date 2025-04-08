// pages/Login.jsx
import React, { useState } from 'react';
import axios from '../api/axios'; // Import the custom axios instance
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/auth/login', { email, password });
      if (response.status === 200) {
        setSuccess(true);
        // Redirect to home/dashboard after successful login
        navigate('/admin');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Login successful!</p>}
        <button type="submit">Login</button>
      </form>
      <div>
        <p>
          Don't have an account?{' '}
          <a href="/register" style={{ color: 'blue' }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
