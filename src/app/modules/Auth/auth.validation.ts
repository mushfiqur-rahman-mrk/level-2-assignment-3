import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    _id: z.string({ required_error: 'id is required.' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});


export const AuthValidation = {
    loginValidationSchema,
}