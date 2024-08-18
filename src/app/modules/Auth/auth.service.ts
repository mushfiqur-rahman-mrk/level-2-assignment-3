// import { User } from "../user/user.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogInUser } from "./auth.interface";
import  jwt from "jsonwebtoken";
import config from "../../config";



const loginUser = async(payload: TLogInUser) => {
   
    const user = await User.isUserExistsByCustomId(payload._id);

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'this user not found');
    };
    if(!(await User.isPasswordMatched(payload?.password, user?.password))){
      
        throw new AppError(httpStatus.FORBIDDEN, "password Not matched");
    }
    

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    
    const accesToken = (jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d'}))
    
    return{
         accesToken
    }
}
export const Authservice = {
    loginUser
}