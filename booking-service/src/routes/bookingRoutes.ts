import { Router } from 'express';
import BookingController from '../controllers/bookingController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/bookings', authMiddleware, BookingController.createBooking);
router.get('/bookings/:bookingId', authMiddleware, BookingController.getBooking);

export default router;
