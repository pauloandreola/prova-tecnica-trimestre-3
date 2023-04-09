import { Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../entities/user'

dotenv.config()

const refreshTokenSecret = process.env.REFRESHTOKEN

const expireRefreshToken = '30d'

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

  const { userId, email } = data as any
  // Verificar se existe o ID do usuário no banco
  const findData = await UserModel.findById(userId)
  if (!findData) {
    return res.status(404).json('User not found!')
  }

  const { refreshToken } = findData as any

  // Compara o refresh token que está no banco com o recebido pelo body da requisição. Se for diferente exclui o que está no banco de dados
  if (refreshToken !== newRefreshToken) {
    // Gera um novo refresh token
    const updateRefreshToken = sign({ userId, email }, refreshTokenSecret, { expiresIn: expireRefreshToken })
    const refreshToken = updateRefreshToken
    // Atualiza o banco de dados com um novo refresh token
    await UserModel.findByIdAndUpdate(userId, { refreshToken })
  }

  return res.status(200).json('Refresh Token Ok')
}
