import bcrypt from 'bcryptjs';

/**
 * In-Memory User Storage
 * This is a simple mock database for testing without MongoDB
 * Data is lost when the server restarts
 */

// Store users in memory
const users = [];
let idCounter = 1;

/**
 * Mock User Model that mimics Mongoose methods
 */
const User = {
  /**
   * Create a new user
   */
  create: async (userData) => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.code = 11000; // Duplicate key error code
      throw error;
    }

    // Validate required fields
    if (!userData.name || userData.name.length < 2) {
      const error = new Error('Name must be at least 2 characters');
      error.name = 'ValidationError';
      throw error;
    }
    if (!userData.email) {
      const error = new Error('Email is required');
      error.name = 'ValidationError';
      throw error;
    }
    if (!userData.password || userData.password.length < 6) {
      const error = new Error('Password must be at least 6 characters');
      error.name = 'ValidationError';
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create user object
    const user = {
      _id: String(idCounter++),
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(user);

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      comparePassword: async (enteredPassword) => {
        return await bcrypt.compare(enteredPassword, user.password);
      },
    };
  },

  /**
   * Find user by email
   */
  findOne: (query) => {
    const searchEmail = query.email ? query.email.toLowerCase().trim() : null;
    const user = users.find(u => u.email === searchEmail);
    
    const result = {
      select: (fields) => {
        if (!user) return Promise.resolve(null);

        // If +password is requested, include password
        if (fields && fields.includes('+password')) {
          return Promise.resolve({
            ...user,
            comparePassword: async (enteredPassword) => {
              return await bcrypt.compare(enteredPassword, user.password);
            },
          });
        }

        // Return without password
        const { password, ...userWithoutPassword } = user;
        return Promise.resolve(userWithoutPassword);
      },
      then: (resolve, reject) => {
        // Allow findOne to be used without select()
        if (!user) return resolve(null);
        const { password, ...userWithoutPassword } = user;
        return resolve(userWithoutPassword);
      }
    };
    
    return result;
  },

  /**
   * Find user by ID
   */
  findById: (id) => {
    return {
      select: (fields) => {
        const user = users.find(u => u._id === id);
        if (!user) return Promise.resolve(null);

        // Return without password by default
        const { password, ...userWithoutPassword } = user;
        return Promise.resolve(userWithoutPassword);
      },
    };
  },
};

export default User;
