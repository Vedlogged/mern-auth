# 🔐 MERN Authentication System

A complete, production-ready authentication system built with the MERN stack (MongoDB, Express, React, Node.js).

![MERN Auth](https://img.shields.io/badge/MERN-Stack-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-38B2AC)

## ✨ Features

- **User Registration** - Create new accounts with validation
- **User Login** - Secure authentication with JWT
- **Protected Routes** - Middleware-based route protection
- **Profile Page** - View user information (protected)
- **Logout** - Secure session termination
- **HTTP-only Cookies** - Secure token storage
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side and client-side validation
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Toast Notifications** - User-friendly feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cookie-parser** - Cookie handling

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

## 📁 Project Structure

```
mern_auth/
├── client/                 # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/        # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/       # API services
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # Database connection
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js        # JWT verification middleware
│   ├── models/
│   │   └── User.js        # User schema
│   ├── routes/
│   │   └── auth.js        # Auth routes
│   ├── utils/
│   │   └── jwt.js         # JWT utilities
│   ├── server.js          # Entry point
│   ├── package.json
│   ├── .env.example
│   └── .env
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone the repository

```bash
cd mern_auth
```

#### 2. Set up the Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and update values
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGO_URI=mongodb://localhost:27017/mern_auth
# JWT_SECRET=your_super_secret_key_here
```

#### 3. Set up the Frontend

```bash
# Navigate to client directory (from root)
cd ../client

# Install dependencies
npm install
```

### Running the Application

#### Start MongoDB (if using local installation)

```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

#### Start the Backend Server

```bash
# From the server directory
cd server
npm run dev

# Server will start on http://localhost:5000
```

#### Start the Frontend Development Server

```bash
# From the client directory (in a new terminal)
cd client
npm run dev

# Frontend will start on http://localhost:5173
```

### 📱 Accessing the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Protected |
| POST | `/api/auth/logout` | Logout user | Protected |

### API Request Examples

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Profile (Protected)
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

1. **Password Hashing** - Passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Authentication** - Tokens expire after 7 days
3. **HTTP-only Cookies** - Prevents XSS attacks on token storage
4. **Input Validation** - Server-side validation using express-validator
5. **CORS Configuration** - Restricted to allowed origins
6. **Secure Headers** - Proper security headers in responses

## 🔧 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env - optional)

```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Usage Guide

### 1. Create an Account
- Navigate to the **Sign Up** page
- Fill in your name, email, and password
- Click "Create Account"

### 2. Login
- Navigate to the **Login** page
- Enter your email and password
- Click "Sign In"

### 3. Access Dashboard
- After login, you'll be redirected to the **Dashboard**
- View your profile information
- The Dashboard is a protected route

### 4. Logout
- Click the **Logout** button in the navbar or dashboard
- You'll be redirected to the login page

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **Validation errors** - Clear messages for invalid input
- **Authentication errors** - Specific error messages for login failures
- **Server errors** - Graceful error handling with user-friendly messages
- **Network errors** - Handled by Axios interceptors

## 🎨 UI/UX Features

- **Responsive Design** - Works on all screen sizes
- **Loading States** - Spinners during async operations
- **Toast Notifications** - Success/error feedback
- **Password Visibility Toggle** - Show/hide password
- **Form Validation** - Real-time validation feedback

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using the MERN Stack
