import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const handleLogout = () => {
    logout(); // Clears authentication context
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={styles.topBar}>
      <div style={styles.timeContainer}>
        <p>{new Date().toLocaleDateString()} | {currentTime}</p>
      </div>
      <div style={styles.userContainer}>
        <p>{user?.name || 'Guest'}</p>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    alignItems: 'center',
  },
  timeContainer: {
    fontSize: '1rem',
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default TopBar;
