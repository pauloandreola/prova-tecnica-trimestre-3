import { Router } from 'express'
import { routerUser } from './user.routes'
import { routerTask } from './task.routes'

export const router = Router()

router.use('/task', routerTask)
router.use('/user', routerUser)
