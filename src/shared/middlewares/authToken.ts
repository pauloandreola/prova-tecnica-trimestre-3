import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../modules/entities/user'

dotenv.config()

const secret = process.env.TOKEN

export async function authToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return res.status(404).json('Token not found!')
  }

  try {
    const data = verify(token, secret) as { email: string}
    const user = UserModel.findOne({ data })
    if (!user) {
      return res.status(401).json('Invalid user!')
    }
  } catch (error) {
    return res.status(401).json('Invalid token')
  }

  return next()
}
