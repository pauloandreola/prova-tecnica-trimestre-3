import { Router } from 'express'

export const routerTask = Router()

routerTask.get('/test', function (req, res) {
  res.status(200).json('Hello world TASK')
})
