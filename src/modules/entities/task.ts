import { Document, Schema, model } from 'mongoose'

export interface ITask extends Document {
  title: string;
  description?: string;
  done: boolean;
  userId?: string;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  userId: { type: String, required: true }

},
{ timestamps: true }
)

export const TaskModel = model<ITask>('Task', taskSchema)
