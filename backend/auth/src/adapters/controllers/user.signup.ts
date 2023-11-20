import { emailSignup, emailVerify } from '../../application/user-cases/auth/user'

import { type Request, type Response } from 'express'
import { type IUserSignupParmeters } from '../../types/types'

export const userSignupController = (
  params: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<Response>
    userEmailVerify: (arg1: Request, arg2: Response) => Promise<Response>
  } => {
  const userEmailSignup = async (req: Request, res: Response): Promise<Response> => {
    await emailSignup(req.body, params)
    return res.status(201).send({ status: 'user created' })
  }

  const userEmailVerify = async (req: Request, res: Response): Promise<Response> => {
    const isEmailVerified = await emailVerify(req.params.token, params)

    if (isEmailVerified) return res.status(200).send('email verified')
    return res.status(400).send('unable to verify')
  }

  return {
    userEmailSignup,
    userEmailVerify
  }
}
