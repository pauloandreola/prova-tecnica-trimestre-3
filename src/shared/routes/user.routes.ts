import { Router } from 'express'

export const routerUser = Router()

routerUser.get('/test', function (req, res) {
  res.status(200).json('Hello world USER')
})
