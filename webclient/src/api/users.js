// api/users.js
import axios from './axios';

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);  // Call the backend register endpoint
    return response.data;  // Handle successful registration response
  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }
};
