import mongoose from 'mongoose'

export interface ITask extends mongoose.Document {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

const taskSchema = new mongoose.Schema({
  _id: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, required: false },
  created_at: { type: Date, require: false },
  updated_at: { type: Date, require: false }

},
{ timestamps: true }
)

export const UserModel = mongoose.model<ITask>('Task', taskSchema)
