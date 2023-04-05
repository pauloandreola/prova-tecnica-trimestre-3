import { Router } from 'express'

import { createUser } from '../../modules/user/useCase/createUserController'
import { getAllUser } from '../../modules/user/useCase/getAllUserController'
import { loginUser } from '../../modules/user/useCase/loginUserController'
import { refreshUser } from '../../modules/user/useCase/refreshUserController'

export const routerUser = Router()

routerUser.get('/test', function (req, res) {
  res.status(200).json('Hello world USER')
})

routerUser.post('/', createUser)
routerUser.get('/users', getAllUser)
routerUser.post('/login', loginUser)
routerUser.get('/refresh', refreshUser)
