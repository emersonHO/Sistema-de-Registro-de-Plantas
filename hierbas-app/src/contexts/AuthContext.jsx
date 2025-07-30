import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      // Try to get user info from token or localStorage
      const userInfo = AuthService.getUserInfo();
      if (userInfo) {
        setUser(userInfo);
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      const userInfo = { email, name: email.split('@')[0] }; // Simple name extraction
      setUser(userInfo);
      setIsAuthenticated(true);
      AuthService.setUserInfo(userInfo);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await AuthService.register(email, password);
      const userInfo = { email, name: email.split('@')[0] }; // Simple name extraction
      setUser(userInfo);
      setIsAuthenticated(true);
      AuthService.setUserInfo(userInfo);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};