import { createContext, useContext, useState } from 'react';
import api from '../api/axios.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/user/login', credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const signup = async (userData) => {
    try {
      const { data } = await api.post('/user/signup', userData);
      setUser(data.user);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
