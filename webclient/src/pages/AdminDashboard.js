import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📋 Admin Dashboard</h1>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/courses')} style={styles.button}>
          📚 Manage Courses
        </button>
        <button onClick={() => navigate('/rooms')} style={styles.button}>
          🏫 Manage Rooms
        </button>
        <button onClick={() => navigate('/assignments')} style={styles.button}>
          📌 View Room Assignments
        </button>
        <button onClick={() => navigate('/students')} style={styles.button}>
          👩‍🎓 Manage Users
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

export default AdminDashboard;
