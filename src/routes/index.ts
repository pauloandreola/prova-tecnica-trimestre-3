import { Router } from 'express'
import { routerUser } from './user'
import { routerTask } from './task'

export const router = Router()

router.use('/task', routerTask)
router.use('/user', routerUser)
