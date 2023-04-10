import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { TaskModel, ITask } from '../../entities/task'
// Método para deletar uma tarefa, fazendo a busca pelo ID
export const deleteTask = async (req: Request, res: Response) => {
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
    // Buscando tarefa pelo ID e deletando a tarefa
    const task: ITask = await TaskModel.findByIdAndDelete(id)
    res.status(200).json({ task, msg: 'Task deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
