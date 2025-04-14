import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/auth/login', { email, password });

      if (response.status === 200) {
        const user = response.data; // assuming backend sends { _id, name, email, role, etc. }

        login(user); // store user in context

        // Redirect based on role
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'instructor':
            navigate('/instructor');
            break;
          case 'student':
            navigate('/student');
            break;
          default:
            navigate('/');
        }
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ padding: '0.5rem', background: '#333', color: 'white' }}>
          Login
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Don’t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
