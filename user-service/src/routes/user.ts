import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.put('/update/:userId', userController.updateUser.bind(userController));
router.get('/:userId', userController.getUser.bind(userController));

export default router;
