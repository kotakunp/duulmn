import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateToken, requireAuth } from '../middleware/auth';
import mongoose from 'mongoose';

// Create Express router
const router = Router();

// Input validation utilities
interface UserInput {
  email?: string;
  username?: string;
  password?: string;
}

const validateUserInput = (data: UserInput) => {
  const errors: string[] = [];
  
  if (data.email) {
    if (typeof data.email !== 'string') {
      errors.push('Email must be a string');
    } else if (!data.email.includes('@')) {
      errors.push('Email must be a valid email address');
    } else if (data.email.length > 100) {
      errors.push('Email must not exceed 100 characters');
    }
  }
  
  if (data.username) {
    if (typeof data.username !== 'string') {
      errors.push('Username must be a string');
    } else if (data.username.trim().length < 3) {
      errors.push('Username must be at least 3 characters long');
    } else if (data.username.trim().length > 30) {
      errors.push('Username must not exceed 30 characters');
    }
  }
  
  if (data.password) {
    if (typeof data.password !== 'string') {
      errors.push('Password must be a string');
    } else if (data.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    } else if (data.password.length > 128) {
      errors.push('Password must not exceed 128 characters');
    }
  }
  
  return errors;
};

// SIGNUP route - Create new user
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        code: 'MISSING_FIELD',
        field: 'email'
      });
    }

    if (!username) {
      return res.status(400).json({ 
        error: 'Username is required',
        code: 'MISSING_FIELD',
        field: 'username'
      });
    }

    if (!password) {
      return res.status(400).json({ 
        error: 'Password is required',
        code: 'MISSING_FIELD',
        field: 'password'
      });
    }

    // Validate input data
    const validationErrors = validateUserInput({ email, username, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedUsername = username.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }] 
    });
    
    if (existingUser) {
      if (existingUser.email === sanitizedEmail) {
        return res.status(409).json({ 
          error: 'Email already exists',
          code: 'EMAIL_EXISTS'
        });
      } else {
        return res.status(409).json({ 
          error: 'Username already taken',
          code: 'USERNAME_EXISTS'
        });
      }
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in database
    const newUser = new User({
      email: sanitizedEmail,
      username: sanitizedUsername,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser._id.toString());

    // Return user data and token (exclude password)
    const userData = {
      _id: (newUser._id as mongoose.Types.ObjectId).toString(),
      email: newUser.email,
      username: newUser.username,
      profileImage: newUser.profileImage,
      role: newUser.role,
      isPremium: newUser.isPremium,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json({ 
      success: true, 
      data: userData,
      token,
      message: 'User created successfully'
    });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    const message = error instanceof Error ? error.message : 'Failed to create user';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'CREATE_ERROR',
      message
    });
  }
});

// LOGIN route - Authenticate user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ 
        error: 'Email is required',
        code: 'MISSING_FIELD',
        field: 'email'
      });
    }

    if (!password) {
      return res.status(400).json({ 
        error: 'Password is required',
        code: 'MISSING_FIELD',
        field: 'password'
      });
    }

    // Validate input data
    const validationErrors = validateUserInput({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();

    // Find user by email
    const user = await User.findOne({ email: sanitizedEmail });
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password',
        code: 'AUTH_FAILED'
      });
    }

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Invalid email or password',
        code: 'AUTH_FAILED'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return user data and token (exclude password)
    const userData = {
      _id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      role: user.role,
      isPremium: user.isPremium,
      createdAt: user.createdAt,
    };

    return res.status(200).json({ 
      success: true, 
      data: userData,
      token,
      message: 'Login successful'
    });
  } catch (error: unknown) {
    console.error('Error logging in:', error);
    const message = error instanceof Error ? error.message : 'Failed to login';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'LOGIN_ERROR',
      message
    });
  }
});

// PROFILE route - Get current user profile (requires authentication)
router.get('/profile', requireAuth, async (req: Request & { user?: { id: string } }, res: Response) => {
  try {
    // Extract user ID from the request (set by requireAuth middleware)
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ 
        error: 'User ID not found in request',
        code: 'UNAUTHORIZED'
      });
    }

    // Find user by ID
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    
    if (!user) {
      return res.status(404).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Return user profile data
    const userData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      profileImage: user.profileImage,
      role: user.role,
      isPremium: user.isPremium,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({ 
      success: true, 
      data: userData,
      message: 'Profile retrieved successfully'
    });
  } catch (error: unknown) {
    console.error('Error fetching profile:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch profile';
    return res.status(500).json({ 
      error: 'Internal server error',
      code: 'PROFILE_ERROR',
      message
    });
  }
});

// LOGOUT route - Currently just a placeholder since client-side handles token removal
router.post('/logout', (req: Request, res: Response) => {
  // In a real implementation, you might want to add the token to a blacklist
  // or perform other cleanup tasks
  return res.status(200).json({ 
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;