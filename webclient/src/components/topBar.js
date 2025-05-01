import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardButton from './dashboardButton'; // Import DashboardButton

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route to check if we're on the login page

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  useEffect(() => {
    // Avoid infinite loop by checking if the user exists and only redirecting if not on register or login pages
    if (!user && location.pathname !== '/register' && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]); // Watch for changes in `user` and `location.pathname`

  const handleLogout = () => {
    logout(); // Clears authentication context
    navigate('/login'); // Redirect to login page
  };

  // Determine if we are on one of the dashboard pages
  const isDashboardPage =
    location.pathname === '/admin' ||
    location.pathname === '/instructor' ||
    location.pathname === '/student';

  return (
    <div style={styles.topBar}>
      <div style={styles.timeContainer}>
        <p>{new Date().toLocaleDateString()} | {currentTime}</p>
      </div>
      <div style={styles.userContainer}>
        <p>{user?.name || 'Guest'}</p>

        {/* Conditionally render the DashboardButton and always show Logout button */}
        {user && location.pathname !== '/login' && !isDashboardPage && (
          <DashboardButton /> // Only show this button if not on a dashboard page
        )}
        
        {/* Always show Logout button unless on the login page */}
        {user && location.pathname !== '/login' && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
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
