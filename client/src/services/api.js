import axios from 'axios';

/**
 * Axios instance configured for API requests
 * - baseURL: Points to backend server
 * - withCredentials: Enables sending cookies with requests (for HTTP-only cookies)
 */
const api = axios.create({
  baseURL: '/api', // Uses Vite proxy in development, or configure for production
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds the JWT token to Authorization header if available in localStorage
 * This is a fallback for environments where cookies don't work well
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles common error scenarios like unauthorized access
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear stored token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Optionally redirect to login (handled by AuthContext)
    }
    return Promise.reject(error);
  }
);

export default api;
