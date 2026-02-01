import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===================
// MIDDLEWARE SETUP
// ===================

// CORS configuration - allows frontend to make requests to backend
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies from requests (needed for HTTP-only cookie authentication)
app.use(cookieParser());

// ===================
// ROUTES
// ===================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// ===================
// ERROR HANDLING
// ===================

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ===================
// START SERVER
// ===================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  =============================================
  🚀 Server running on port ${PORT}
  📝 Environment: ${process.env.NODE_ENV || 'development'}
  🔗 API URL: http://localhost:${PORT}/api
  =============================================
  `);
});
