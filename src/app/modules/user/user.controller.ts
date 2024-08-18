import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createStudent =catchAsync( async (req, res) => {
  const {  student: userData } = req.body;
    

    const result = await UserServices.createStudentIntoDB(
      
      userData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
});

export const UserControllers = {
  createStudent,
};
