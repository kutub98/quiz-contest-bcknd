import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../modules/User/user.model';
import config from '../config';


export interface AuthRequest extends Request {
  user?: { userId: string; role?: string }; // role optional
}



export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Access denied. No token provided.' });
    }
    // Verify token
    const decoded = jwt.verify(token, config.jwt_secret as string) as {
      userId: string;
      role: string;
    };

    // Check if token exists in user's tokens array
    const user = await User.findOne({ _id: decoded.userId, tokens: token });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    // req.user = { userId: decoded.userId, role: user.role };
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Remove expired token from database
      try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
          await User.updateOne({ tokens: token }, { $pull: { tokens: token } });
        }
      } catch (dbError) {
        console.error('Error removing expired token:', dbError);
      }
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    authenticate(req, res, () => {
      if (!req.user) {
        res
          .status(401)
          .json({ success: false, message: 'Authentication required' });
        return;
      }
      if (!roles.includes(req.user.role!)) {
        res
          .status(403)
          .json({ success: false, message: 'Insufficient permissions' });
        return;
      }
      next();
    });
  };
};

