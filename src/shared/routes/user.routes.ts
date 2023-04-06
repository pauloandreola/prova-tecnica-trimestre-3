import { Router } from 'express'

import { createUser } from '../../modules/user/useCase/createUserController'
import { getAllUser } from '../../modules/user/useCase/getAllUserController'
import { loginUser } from '../../modules/user/useCase/loginUserController'
import { refreshTokenUser } from '../../modules/user/useCase/refreshTokenUserController'

export const routerUser = Router()

routerUser.post('/', createUser)
routerUser.get('/users', getAllUser)
routerUser.post('/login', loginUser)
routerUser.get('/refreshtoken', refreshTokenUser)
