// D:\PersonalClientWork\quiz-contest\quiz-contest-bcknd\src\app\modules\User\user.route.ts
import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  checkUserExists 
} from './user.controller';
import { authenticate, requireRole } from '../../middleware/auth.middleware';
import upload from '../../config/multer';

const router = Router();

// Public routes
router.post('/register', upload.single('profileImage'), registerUser); // ইমেজ আপলোড মিডলওয়্যার যোগ
router.post('/login', loginUser);
router.post('/check-user', checkUserExists);

// Protected routes
router.post('/logout', authenticate, logoutUser);
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, upload.single('profileImage'), updateUserProfile); // ইমেজ আপলোড মিডলওয়্যার যোগ

// Admin only routes
router.get('/admin/users', authenticate, requireRole(['admin']), (req, res) => {
  // Admin user management logic here
  res.json({ success: true, message: 'Admin access granted' });
});

export const UserRoutes = router;