import { type Request, type Response } from 'express'
import { type IUserLoginParams } from '../../types/types'
import { emailLogin } from '../../user-cases/auth/user.signin'

export const userLoginController = (
  params: IUserLoginParams
): {
    userEmailLogin: (arg1: Request, arg2: Response) => Promise<void>
  } => {
  const userEmailLogin = async (req: Request, res: Response): Promise<void> => {
    const userNameAndUserId = await emailLogin(req.body, params)
    res.status(200).send(userNameAndUserId)
  }

  return {
    userEmailLogin
  }
}
