import { Request, Response } from 'express'

import { TaskModel, ITask } from '../../entities/task'
// Método para criar uma tarefa passando os dados de título, descrição e se a tarefa está feita ou não.
export const createTask = async (req: Request, res: Response) => {
  const { userId, title, description, done } = req.body
  try {
    const task: ITask = new TaskModel({ userId, title, description, done })
    await task.save()
    res.status(201).json(task)
  } catch (err) {
    res.status(400).json('Task not created')
  }
}
