import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { CarRoutes } from '../modules/car/car.route';
import { BookingRoutes } from '../modules/Bookings/booking.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
