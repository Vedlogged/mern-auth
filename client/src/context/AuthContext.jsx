import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

/**
 * Authentication Context
 * Provides global authentication state and methods throughout the app
 */
const AuthContext = createContext(null);

/**
 * Custom hook to use the auth context
 * @returns {Object} - Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication state and methods
 */
export const AuthProvider = ({ children }) => {
  // State for storing user data
  const [user, setUser] = useState(null);
  // Loading state for initial auth check
  const [loading, setLoading] = useState(true);
  // Error state
  const [error, setError] = useState(null);

  /**
   * Check authentication status on app load
   * Attempts to get user profile if token exists
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is stored in localStorage
        const storedUser = authService.getStoredUser();
        
        if (storedUser && authService.isAuthenticated()) {
          // Verify token is still valid by fetching profile
          const response = await authService.getProfile();
          setUser(response.user);
        }
      } catch (err) {
        // Token is invalid or expired, clear storage
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   */
  const register = async (userData) => {
    setError(null);
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    await authService.logout();
    setUser(null);
    setError(null);
  };

  /**
   * Clear any auth errors
   */
  const clearError = () => {
    setError(null);
  };

  // Context value object
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
