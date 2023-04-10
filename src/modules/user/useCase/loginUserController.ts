import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../entities/user'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '10m'
const expireRefreshToken = '30d'

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    // Encontra o usuário pelo e-mail
    const user = await UserModel.findOne({ email })
    // Se o email do usuário não foi encontrado
    if (!user) {
      return res.status(422).json({ error: 'Invalid credentials' })
    }
    // Compara se a senha digitada é igual ao que está no banco
    const isPasswordValid = await bcrypt.compare(String(password), user.password)
    // Validação se a senha não estiver correta
    if (!isPasswordValid) {
      return res.status(422).json({ error: 'Invalid credentials' })
    }
    // Cria um token com expiração conforme tempo definido na variável expireToken
    const token = sign({ userId: user.id, email: user.email }, tokenSecret, { expiresIn: expireToken })
    // Cria um token com expiração conforme tempo definido na variável expireRefreshToken
    const refreshToken = sign({ userId: user.id, email: user.email }, refreshTokenSecret, { expiresIn: expireRefreshToken })
    //  Método de atualização no banco do refresh token
    await UserModel.findByIdAndUpdate(user.id, { refreshToken })

    res.status(200).json({ token, user, refreshToken })
  } catch (err) {
    res.status(500).json('Something is wrong verify your login')
  }
}
