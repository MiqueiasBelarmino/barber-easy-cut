import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/forgot-password', authController.requestPasswordReset.bind(authController));
router.post('/reset-password/:token', authController.resetPassword.bind(authController));

export default router;
