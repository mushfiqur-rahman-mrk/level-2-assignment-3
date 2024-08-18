import express from 'express';
import { CarControllers } from './car.controller';
import auth from '../../middlewares/auth';





const router = express.Router();


router.post('/create-car',auth('admin'), CarControllers.createCar);
router.get('/', CarControllers.getAllCars);
router.get(
    '/:carId', 
    CarControllers.getSingleCar,
  );
  router.put(
    '/:carId',
    auth('admin'),
    CarControllers.updateCar,
  );


  router.delete('/:id',auth('admin'), CarControllers.deletedCar);

export const CarRoutes = router;