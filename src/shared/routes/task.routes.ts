import { Router } from 'express'

import { createTask } from '../../modules/task/useCase/createTaskController'
import { deleteTask } from '../../modules/task/useCase/deleteTaskController'
import { getAllTask } from '../../modules/task/useCase/getAllTaskController'
import { getTask } from '../../modules/task/useCase/getTaskController'
import { getTaskFilter } from '../../modules/task/useCase/getTaskFilterController'
import { updateTask } from '../../modules/task/useCase/updateTaskController'

import { authToken } from '../middlewares/authToken'

export const routerTask = Router()

routerTask.get('/test', function (req, res) {
  res.status(200).json('Hello world TASK')
})

routerTask.post('/', authToken, createTask)
routerTask.delete('/:id', authToken, deleteTask)
routerTask.get('/tasks', authToken, getAllTask)
routerTask.get('/:id', authToken, getTask)
routerTask.get('/filter/:id', authToken, getTaskFilter)
routerTask.put('/:id', authToken, updateTask)
