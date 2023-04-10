import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { TaskModel, ITask } from '../../entities/task'
//  Método para buscar uma tarefa pelo ID
export const getTask = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    // Verificando se o ObjectID é válido
    const test = ObjectId.isValid(id)
    if (!test) {
      return res.status(422).json('Invalid ID!')
    }
    // Buscando a tarefa pelo ID e mostrando na tela
    const task: ITask = await TaskModel.findById(id)
    res.status(200).json({ task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
