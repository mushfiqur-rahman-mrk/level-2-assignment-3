import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { Authservice } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser = catchAsync(async(req, res) => {
   
    const result = await Authservice.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Logged in succesfully',
        data: result,
      });
})
export const AuthControllers = {
    loginUser
}