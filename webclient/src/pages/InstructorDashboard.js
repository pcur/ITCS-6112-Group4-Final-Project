// pages/InstructorDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎓 Instructor Dashboard</h1>
      <p>Welcome, {user?.name || 'Instructor'}!</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => navigate('/instructor/courses')}>📘 My Courses</button>
        <button onClick={() => navigate('/instructor/new-course')}>➕ Create New Course</button>
        <button onClick={() => navigate('/instructor/students')}>👥 View Enrolled Students</button>
      </div>
    </div>
  );
}

export default InstructorDashboard;
