import { Router } from 'express'

import { createTask } from '../../modules/task/useCase/createTaskController'
import { deleteTask } from '../../modules/task/useCase/deleteTaskController'
import { getAllTask } from '../../modules/task/useCase/getAllTaskController'
import { getTask } from '../../modules/task/useCase/getTaskController'
import { getTaskFilter } from '../../modules/task/useCase/getTaskFilterController'
import { updateTask } from '../../modules/task/useCase/updateTaskController'

export const routerTask = Router()

routerTask.get('/test', function (req, res) {
  res.status(200).json('Hello world TASK')
})

routerTask.post('/', createTask)
routerTask.delete('/:id', deleteTask)
routerTask.get('/tasks', getAllTask)
routerTask.get('/:id', getTask)
routerTask.get('/filter', getTaskFilter)
routerTask.put('/:id', updateTask)
