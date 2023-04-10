import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { ITask, TaskModel } from '../../entities/task'

export const updateTask = async (req: Request, res: Response) => {
  const { title, description, done } = req.body
  const id = req.params.id
  try {
    // Verificando se o ObjectID é válido
    const test = ObjectId.isValid(id)
    if (!test) {
      return res.status(422).json('Invalid ID!')
    }
    // Verificando se existe o ID no banco
    const findTask = await TaskModel.findById(id)
    if (!findTask) {
      return res.status(404).json('Task not found!')
    }
    // Buscando tarefa pelo ID e atualizando os campos da tarefa
    const updatedTask: ITask = await TaskModel.findByIdAndUpdate(id, { title, description, done })
    res.status(200).json({ updatedTask, msg: 'Task updated!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
