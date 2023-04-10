import { Request, Response } from 'express'

import { TaskModel, ITask } from '../../entities/task'
import { ObjectId } from 'mongodb'

export const getTaskFilter = async (req: Request, res: Response) => {
  const { userId, title, done } = req.body
  try {
    // Verificando se o ObjectID é válido
    const test = ObjectId.isValid(userId)
    if (!test) {
      return res.status(422).json('Invalid ID!')
    }

    const tasksFilter: ITask[] = await TaskModel.find({
      $and: [
        { title: { $regex: title as string, $options: 'i' } },
        { userId: { $regex: userId as string, $options: 'i' } },
        { done: done as boolean }
      ]
    })

    res.status(200).json(tasksFilter)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
