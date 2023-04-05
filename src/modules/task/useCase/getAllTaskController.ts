import { Request, Response } from 'express'

import { TaskModel, ITask } from '../../entities/task'
// Método para listar todas as tarefas criadas
export const getAllTask = async (req: Request, res: Response) => {
  try {
    const tasks: ITask[] = await TaskModel.find()
    res.status(200).json(tasks)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
