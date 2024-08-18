

import { TUser } from './user.interface';
import { User } from './user.model';


const createStudentIntoDB = async ( payload: TUser) => {
  // create a user object
  
  const result = await User.create( payload);
  return result;
  //set manually generated it
  
};

export const UserServices = {
  createStudentIntoDB,
};
