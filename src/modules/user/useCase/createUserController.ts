import { Request, Response } from 'express'

import { UserModel, IUser } from '../../entities/user'
// Método para criar um usuário com os dados de nome, email e senha
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  try {
    const user: IUser = new UserModel({ name, email, password })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json('User already exist')
  }
}
