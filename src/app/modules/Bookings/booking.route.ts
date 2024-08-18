

import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';




const router = express.Router();


router.post('/create-booking',auth('user'), BookingControllers.createBooking);
router.get('/', BookingControllers.getAllBookings);
router.put('/return',auth('admin'), BookingControllers.updateBookings);
router.get('/my-bookings',auth('user'), BookingControllers.getUserBooking);
export const BookingRoutes = router;
