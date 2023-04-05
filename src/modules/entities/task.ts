import { Document, Schema, model } from 'mongoose'

export interface ITask extends Document {
  title: string;
  description?: string;
  done: boolean;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, default: false }

},
{ timestamps: true }
)

export const TaskModel = model<ITask>('Task', taskSchema)
