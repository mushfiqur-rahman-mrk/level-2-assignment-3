import { model, Schema, Types } from "mongoose";
import { TBooking } from "./booking.intrface";
import { TCar } from "../car/car.interface";


const bookingSchema = new Schema<TBooking>(
    {
        date: { type: Date, required: true }, // Date object for the booking date
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
        car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },  // Reference to the Car model
        startTime: { type: String, required: true }, // Start time in 24hr format
        endTime: { type: String,  }, // Start time in 24hr format

        totalCost: { type: Number, default: 0, required: true }, 
    },
    {
      timestamps: true,
    },
  );

  
  bookingSchema.post<TBooking>('save', function(doc, next) {
    // Update car status to unavailable
    model<TCar>('Car').findById(doc.car).exec().then(car => {
      if (car) {
        car.status = 'unavailable'; // Set the car status to unavailable
        car.save();
      }
    });
    
    next(); // Continue with the next middleware or route handler
  });
 
  bookingSchema.pre<TBooking>('save', async function(next) {
    if (this.endTime && this.startTime) {
      let pricePerHour: number | undefined;
  
      // Fetch car details if car is an ObjectId
      if (this.car instanceof Types.ObjectId) {
        const car = await model<TCar>('Car').findById(this.car).exec();
        if (car) {
          pricePerHour = car.pricePerHour;
  
          // Update car status to 'available'
          car.status = 'available';
          await car.save(); // Save the car status update
        }
      } else if (this.car && 'pricePerHour' in this.car) {
        // Use pricePerHour if car data is already populated
        pricePerHour = this.car.pricePerHour;
      }
  
      // Calculate totalCost if pricePerHour is available
      if (pricePerHour !== undefined) {
        const startHour = parseInt(this.startTime.split(':')[0], 10);
        const startMinute = parseInt(this.startTime.split(':')[1], 10);
        const endHour = parseInt(this.endTime.split(':')[0], 10);
        const endMinute = parseInt(this.endTime.split(':')[1], 10);
  
        const startInHours = startHour + startMinute / 60;
        const endInHours = endHour + endMinute / 60;
  
        const duration = endInHours - startInHours;
  
        this.totalCost = duration * pricePerHour;
      } else {
        // Set totalCost to 0 if pricePerHour is not available
        this.totalCost = 0;
      }
    }
  
    next();
  });
  
  
export const Booking = model<TBooking>('Booking', bookingSchema);