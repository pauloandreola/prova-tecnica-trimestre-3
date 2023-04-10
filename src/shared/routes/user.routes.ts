import { Router } from 'express'

import { createUser } from '../../modules/user/useCase/createUserController'
import { loginUser } from '../../modules/user/useCase/loginUserController'
import { refreshTokenUser } from '../../modules/user/useCase/refreshTokenUserController'

export const routerUser = Router()

routerUser.post('/', createUser)
routerUser.post('/login', loginUser)
routerUser.post('/refreshtoken', refreshTokenUser)
