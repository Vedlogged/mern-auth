import jwt from 'jsonwebtoken';
import User from '../models/UserMemory.js';

/**
 * Authentication Middleware
 * Protects routes by verifying JWT token
 * Token can be sent via HTTP-only cookie or Authorization header
 */
const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in HTTP-only cookie first (more secure)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Fallback: Check Authorization header (Bearer token)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return unauthorized error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token payload (excluding password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, user not found',
      });
    }

    // Attach user to request object for use in protected routes
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid token',
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token expired',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }
};

export default protect;
