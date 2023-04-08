import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../entities/user'

dotenv.config()

const refreshTokenSecret = process.env.REFRESHTOKEN

export const refreshTokenUser = async (req: Request, res: Response) => {
  const { newRefreshToken } = req.body || req.query.token || req.headers['X-access-token']
  if (!newRefreshToken) {
    return res.status(404).json('Token not found!')
  }

  const user = verify(newRefreshToken, refreshTokenSecret)
  const id = UserModel.findById(user)
  if (!id) {
    return res.status(401).json('Invalid user!')
  }
  console.log('USER******', user)
}
