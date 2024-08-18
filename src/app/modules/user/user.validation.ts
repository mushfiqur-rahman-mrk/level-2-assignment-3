import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(['user', 'admin']),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  address: z.string().min(1, "Address is required"),
});

export const UserValidation = {
  userValidationSchema,
};
