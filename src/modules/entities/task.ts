import { Document, Schema, model } from 'mongoose'

export interface ITask extends Document {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}

const taskSchema = new Schema({
  _id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }

},
{ timestamps: true }
)

export const TaskModel = model<ITask>('Task', taskSchema)
