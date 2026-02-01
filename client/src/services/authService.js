import api from './api';

/**
 * Authentication Service
 * Contains all API calls related to authentication
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} - API response with user data and token
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      // Store token in localStorage as backup
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - API response with user data and token
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      // Store token in localStorage as backup
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Get user profile
   * @returns {Promise} - API response with user profile data
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  /**
   * Logout user
   * Clears cookies and localStorage
   * @returns {Promise} - API response
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with local cleanup even if API call fails
      console.error('Logout API error:', error);
    }
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get stored user from localStorage
   * @returns {Object|null}
   */
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
