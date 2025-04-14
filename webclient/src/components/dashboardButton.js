// components/DashboardButton.js
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
        style={{
        marginTop: '2rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        cursor: 'pointer'
    }}
    >
        🔙 Back to Dashboard
    </button>

  );
}

export default DashboardButton;
