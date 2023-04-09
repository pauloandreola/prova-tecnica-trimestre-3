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
  // Verificar as informações contidas no refresh token
  const data = verify(newRefreshToken, refreshTokenSecret)
  if (!data) {
    return res.status(401).json('Invalid user!')
  }
  const { userId } = data as any
  // Verificar se existe o ID do usuário no banco
  const findUser = await UserModel.findById(userId)
  if (!findUser) {
    return res.status(404).json('User not found!')
  }
}
