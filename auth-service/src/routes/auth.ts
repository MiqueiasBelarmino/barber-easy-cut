import { Router } from 'express';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);
export default router;
