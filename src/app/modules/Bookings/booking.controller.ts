import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";


const createBooking = catchAsync(async (req, res) => {
const user = req.user.userId;
;
req.body.user= user;

    const result =
      await BookingServices.createBookingIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking created successfully',
      data: result,
    });
  });


  const getAllBookings = catchAsync(async (req, res) => {

    const result =
      await BookingServices.getAllBookingsFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Bookings are retrieved successfully',
      data: result,
    });
  });
  const updateBookings = catchAsync(async (req, res) => {
    const { bookingId, endTime } = req.body;
    const result =
      await BookingServices.updateBookingsIntoDB(bookingId, endTime);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car returned Successfully',
      data: result,
    });
  });


  const getUserBooking = catchAsync(async (req, res) => {
    const user = req.user.userId;
    
    
  
        const result =
          await BookingServices.getUserBookingFromDB(user);
     
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Booking created successfully',
          data: result,
        });
      });
  export const BookingControllers = {
    createBooking,
    getAllBookings,
    updateBookings,
    getUserBooking

  };