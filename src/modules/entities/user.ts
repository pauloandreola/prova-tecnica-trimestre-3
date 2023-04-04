import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true }
})

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(8)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash
  next()
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
