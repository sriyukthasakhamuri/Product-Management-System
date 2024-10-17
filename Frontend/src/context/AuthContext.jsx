import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate(); // Initialize useNavigate

  // Load user data from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = JSON.parse(atob(token.split('.')[1])); // Decode token
      setUser({ ...decodedUser, token }); // Set user state with token
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const response = await api.loginUser({ email, password });
    localStorage.setItem('token', response.token);
    const decodedUser = JSON.parse(atob(response.token.split('.')[1])); // Decode token
    setUser({ ...decodedUser, token: response.token });
    navigate(`/dashboard/${decodedUser.role}`);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setUser(null); // Clear user state
    navigate('/'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
