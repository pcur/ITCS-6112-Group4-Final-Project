import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function InstructorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎓 Instructor Dashboard</h1>
      <p style={styles.welcomeMessage}>Welcome, {user?.name || 'Instructor'}!</p>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/courses')} style={styles.button}>
          📘 My Courses
        </button>
        <button onClick={() => navigate('/courses/new')} style={styles.button}>
          ➕ Create New Course
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem', // Increased vertical spacing between buttons
    marginTop: '2rem',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Ensures button takes full width
    boxSizing: 'border-box', // Ensures padding and border are included in the width
  },
};

export default InstructorDashboard;
