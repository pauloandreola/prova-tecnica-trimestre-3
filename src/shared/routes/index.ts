import { Router } from 'express'
import { routerUser } from './user.routes'
import { routerTask } from './task.routes'

export const router = Router()

router.get('/', function (req, res) {
  res.status(200).json('Hello world')
})

router.use('/task', routerTask)
router.use('/user', routerUser)
