import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UserModel } from '../../entities/user'

dotenv.config()

const secret = process.env.TOKEN
const hashRefreshToken = process.env.HASHREFRESHTOKEN

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
    // Cria um token com expiração em
    const token = sign({ mail: user.email }, secret, { expiresIn: '1m' })

    const refreshToken = sign({ userId: user.id }, hashRefreshToken, { expiresIn: '30d' })
    // Retorna o token para manipulação
    res.status(200).json({ refreshToken, token, user })
  } catch (err) {
    res.status(500).json('Something is wrong verify your login')
  }
}
