import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router> {/* This should be the only Router in your app */}
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
