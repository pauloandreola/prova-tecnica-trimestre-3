import { Router } from 'express'

import { createTask } from '../../modules/task/useCase/createTaskController'
import { deleteTask } from '../../modules/task/useCase/deleteTaskController'
import { listTask } from '../../modules/task/useCase/listTaskController'
import { listTaskFilter } from '../../modules/task/useCase/listTaskFilterController'
import { updateTask } from '../../modules/task/useCase/updateTaskController'

import { authToken } from '../middlewares/authToken'

export const routerTask = Router()

routerTask.use(authToken)

routerTask.post('/', createTask)
routerTask.delete('/:id', deleteTask)
routerTask.get('/:id', listTask)
routerTask.get('/filter/task', listTaskFilter)
routerTask.put('/:id', updateTask)
