import { Router } from 'express'

import { createTask } from '../../modules/task/useCase/createTaskController'
import { deleteTask } from '../../modules/task/useCase/deleteTaskController'
import { getTask } from '../../modules/task/useCase/getTaskController'
import { getTaskFilter } from '../../modules/task/useCase/getTaskFilterController'
import { updateTask } from '../../modules/task/useCase/updateTaskController'

import { authToken } from '../middlewares/authToken'

export const routerTask = Router()

routerTask.use(authToken)

routerTask.post('/', createTask)
routerTask.delete('/:id', deleteTask)
routerTask.get('/:id', getTask)
routerTask.get('/filter/task', getTaskFilter)
routerTask.put('/:id', updateTask)
