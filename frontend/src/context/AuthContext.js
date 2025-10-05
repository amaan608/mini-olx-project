import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      // NOTE: Ensure your Django JWT payload includes 'username'.
      // The default simple-jwt payload has 'user_id'. You may need to customize the token payload in Django.
      setUser({ username: decodedToken.username, id: decodedToken.user_id });
    } else {
      setUser(null);
    }
  }, [authToken]);

  const login = async (username, password) => {
    const response = await apiClient.post('/token/', { username, password });
    localStorage.setItem('authToken', response.data.access);
    setAuthToken(response.data.access);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const register = async (username, email, password) => {
    await apiClient.post('/register/', { username, email, password });
    await login(username, password);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);