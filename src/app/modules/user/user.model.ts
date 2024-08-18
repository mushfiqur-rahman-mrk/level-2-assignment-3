import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import config from '../../config';
import {  TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });

// auth


userSchema.statics.isUserExistsByCustomId = async function (_id: Types.ObjectId) {
  return await User.findOne({ _id });
};

// password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser, UserModel>('User', userSchema);
