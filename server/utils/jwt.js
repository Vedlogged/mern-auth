import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * @param {string} id - User's MongoDB _id
 * @returns {string} - Signed JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Set JWT token in HTTP-only cookie
 * HTTP-only cookies are more secure as they can't be accessed via JavaScript
 * @param {Object} res - Express response object
 * @param {string} token - JWT token to set
 */
export const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true, // Cookie cannot be accessed via JavaScript (XSS protection)
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'strict', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  res.cookie('token', token, cookieOptions);
};

/**
 * Clear JWT cookie (for logout)
 * @param {Object} res - Express response object
 */
export const clearTokenCookie = (res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiry to past date to clear cookie
  });
};
