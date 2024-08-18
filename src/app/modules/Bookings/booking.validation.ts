import { z } from 'zod';

const bookingValidationSchema = z.object({
    date: z.date({ required_error: "Date is required" }), // Validates that date is a Date object
    user: z.string().min(1, "User ID is required"), // Validates that user is a non-empty string (assuming it's an ObjectId as a string)
    car: z.string().min(1, "Car ID is required"),  // Validates that car is a non-empty string (assuming it's an ObjectId as a string)
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time format"), // Validates that startTime is in 24-hour format (e.g., "14:00")
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time format").optional(),   // Validates that endTime is in 24-hour format (e.g., "16:00")
    totalCost: z.number().min(0, "Total cost must be 0 or more").default(0), 
});

export const BookingValidation = {
    bookingValidationSchema,
};