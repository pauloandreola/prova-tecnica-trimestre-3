import { Request, Response } from 'express'

import { TaskModel, ITask } from '../../entities/task'
import { ConnectionClosedEvent } from 'mongodb'

export const getTaskFilter = async (req: Request, res: Response) => {
  const { title, done } = req.body
  try {
    const firstFilter: ITask[] = await TaskModel.find(title)

    res.status(200).json(firstFilter)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
