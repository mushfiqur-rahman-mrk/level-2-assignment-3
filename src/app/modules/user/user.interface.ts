import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  id: Types.ObjectId;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
};


export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(_id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}


export type TUserRole = keyof typeof USER_ROLE;