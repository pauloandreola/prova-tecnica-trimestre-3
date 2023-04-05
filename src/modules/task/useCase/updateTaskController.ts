import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { ITask, TaskModel } from '../../entities/task'

export const updateTask = async (req: Request, res: Response) => {
  const { title, description, done } = req.body
  const id = req.params.id
  try {
    const test = ObjectId.isValid(id)
    // Verificando se o ObjectID é válido
    if (!test) {
      return res.status(400).json('Invalid ID!')
    }
    const findTask = await TaskModel.findById(id)
    // Verificando se existe o ID no banco
    if (!findTask) {
      return res.status(404).json('Task not found!')
    }
    // Buscando tarefa pelo ID e atualizando os campos da tarefa
    const newTask = { title, description, done }
    const updatedTask: ITask = await TaskModel.findByIdAndUpdate(id, newTask)
    res.status(200).json({ updatedTask, msg: 'Task updated!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
