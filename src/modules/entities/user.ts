import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true }
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
