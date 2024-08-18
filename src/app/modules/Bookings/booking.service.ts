

import { TBooking } from "./booking.intrface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
 
    const result = await Booking.create(payload);
    return result;
  };
  const getAllBookingsFromDB = async () => {
    const result = await Booking.find().populate('user').populate('car');
    return result;
  };
  const updateBookingsIntoDB = async (bookingId: string, endTime: string) => {
    const result = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: { endTime } }, // Only update the endTime field
      { new: true }          // Return the updated document
    ).populate('user').populate('car');
  
    return result;
  };
  
  const getUserBookingFromDB = async (_id: string) => {
  
   
    const result = await Booking.findById(_id).exec();
    return result;
  };

  export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    updateBookingsIntoDB,
    getUserBookingFromDB

  };