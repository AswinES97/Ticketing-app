import { type Request, type Response } from 'express'
import { type IUserLoginParams } from '../../types/types'
import { emailLogin } from '../../user-cases/auth/user'

export const userLoginController = (
  params: IUserLoginParams
): {
    userEmailLogin: (arg1: Request, arg2: Response) => Promise<void>
  } => {
  const userEmailLogin = async (req: Request, res: Response): Promise<void> => {
    const token = await emailLogin(req.body, params)

    res.cookie('jwt', token?.refreshToken, {
      httpOnly: true,
      maxAge: 1296000,
      sameSite: 'lax'
    })

    res.status(200).send({
      token: token?.accessToken
    })
  }

  return {
    userEmailLogin
  }
}
