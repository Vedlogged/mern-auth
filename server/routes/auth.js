import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login, getProfile, logout } from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

/**
 * Validation middleware for registration
 * Checks name, email format, and password requirements
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * Validation middleware for login
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Middleware to handle validation errors
 * Returns formatted error messages if validation fails
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((err) => err.msg).join(', '),
      errors: errors.array(),
    });
  }
  next();
};

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes (require authentication)
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

export default router;
