import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthResult {
  authenticated: boolean;
  userId?: string;
  error?: string;
}

interface JwtPayload {
  userId: string;
  exp: number;
  iat: number;
}

/**
 * Authenticate token from request headers
 */
export const authenticateToken = async (req: Request): Promise<AuthResult> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authenticated: false,
        error: 'Missing or invalid authorization header'
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT token
    try {
      const secret: string = process.env.JWT_SECRET ?? 'fallback_secret';
      const decoded = jwt.verify(token, secret) as JwtPayload;
      
      return {
        authenticated: true,
        userId: decoded.userId
      };
    } catch (verifyError) {
      console.error('JWT verification error:', verifyError);
      return {
        authenticated: false,
        error: 'Invalid or expired token'
      };
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      authenticated: false,
      error: 'Authentication failed'
    };
  }
};

/**
 * Express middleware to require authentication
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authResult = await authenticateToken(req);

  if (!authResult.authenticated) {
    return res.status(401).json({ error: authResult.error || 'Unauthorized' });
  }

  // Add user info to request for use in other handlers
  if (authResult.userId) {
    (req as Request & { user?: { id: string } }).user = { id: authResult.userId };
  }
  next();
};