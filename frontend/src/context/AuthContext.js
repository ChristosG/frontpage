import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await API.get('users/check-auth/');
      if (response.data.isAuthenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };


  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await API.get('users/get-csrf-token/');
        checkAuthStatus();
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);
  
  // useEffect(() => {
  //   API.get('users/get-csrf-token/').then(() => {
  //     checkAuthStatus();
  //   });
  // }, []);

  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
