import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";




const auth = (...requiredRoles: TUserRole[]) => {

    // validation check 
    return catchAsync( async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if(!token){
            throw new AppError(httpStatus.FORBIDDEN, " You are not Auhtorized")
        }

        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
          ) as JwtPayload;
     
          const { role, userId } = decoded;
   
          
          const user = await User.isUserExistsByCustomId(userId);
  
          if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
          };
          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized  hi!',
            );
          }
      
          req.user = decoded as JwtPayload;
        next();
    }
    
)

}

export default auth;