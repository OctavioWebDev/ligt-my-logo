import React, { createContext, useState, useEffect } from 'react';
import { loginUser } from '../services/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password, callback) => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.accessToken); // Store the access token
      localStorage.setItem('roles', JSON.stringify(data.roles)); // Store user roles
      setIsAuthenticated(true); // Set authentication status to true
      setIsLoggedIn(true); // Set login status to true
      if (callback) callback(); // Execute the callback
    } catch (error) {
      console.error('Login failed:', error);
      setIsAuthenticated(false); // Set authentication status to false
      setIsLoggedIn(false); // Set login status to false
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('email'); // Remove the email from local storage
    setIsAuthenticated(false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setIsLoggedIn(true);
    }
  }, []);

  const value = {
    isAuthenticated,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


