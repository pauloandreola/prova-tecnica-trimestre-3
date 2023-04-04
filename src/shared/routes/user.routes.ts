import { Router } from 'express'

import { createUser } from '../../modules/user/useCase/createUser/createUserController'
import { getAll } from '../../modules/user/useCase/getAllUser/getAllUserController'
import { login } from '../../modules/user/useCase/loginUser/loginUserController'

export const routerUser = Router()

routerUser.get('/test', function (req, res) {
  res.status(200).json('Hello world USER')
})

routerUser.post('/', createUser)
routerUser.get('/users', getAll)
routerUser.post('/login', login)
