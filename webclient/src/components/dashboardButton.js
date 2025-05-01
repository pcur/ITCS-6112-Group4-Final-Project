import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardButton() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const route = {
    admin: '/admin',
    instructor: '/instructor',
    student: '/student'
  }[user?.role] || '/';

  return (
    <button
      onClick={() => navigate(route)}
      style={styles.button}
      onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
      onMouseOut={(e) => e.target.style.textDecoration = 'none'}
    >
      {'←'} Back to Dashboard
    </button>
  );
}

const styles = {
  button: {
    padding: '0.5rem 1.5rem', // Increased vertical padding to match logout button
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none', // Ensure text decoration is none by default
  },
};

export default DashboardButton;
