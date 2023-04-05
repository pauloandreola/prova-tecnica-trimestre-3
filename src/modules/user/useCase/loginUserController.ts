import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../entities/user'

dotenv.config()

const secret = process.env.JWT
const refreshTokenHash = 'hashRefreshToken'

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
    // Cai aqui se a senha não estiver correta
    if (!isPasswordValid) {
      return res.status(422).json({ error: 'Invalid credentials' })
    }
    // Cria um token JWT
    const token = jwt.sign({ mail: user.email }, secret, { expiresIn: '1d' })

    const refreshToken = jwt.sign({ userId: user.id }, refreshTokenHash, { expiresIn: '30d' })
    // Retorna o token para manipulação
    res.status(200).json({ refreshToken, token, user })
  } catch (err) {
    res.status(500).json('Something is wrong verify your login')
  }
}
