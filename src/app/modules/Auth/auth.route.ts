import express from 'express'
import validateRequest from '../../middlewares/validationRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controllers';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
export const AuthRoutes = router;