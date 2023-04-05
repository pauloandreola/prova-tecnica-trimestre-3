/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../modules/entities/user'

dotenv.config()

const secret = process.env.JWT

interface IToken {
  data: string;
}

export function authToken (req: Request, res: Response, next: NextFunction) {
  const headerAuth = req.headers.authorization
  const token = headerAuth?.split(' ')[1]
  if (!token) {
    return res.status(404).json('Token not found!')
  }

  let data: IToken
  try {
    data = verify(token, secret) as IToken
  } catch (error) {
    return res.status(422).json('Invalid token')
  }

  const user = UserModel.findOne({ data })
  if (!user) {
    return res.status(422).json('Invalid user!')
  }
  return next()
}
