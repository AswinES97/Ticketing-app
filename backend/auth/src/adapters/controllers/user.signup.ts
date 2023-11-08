import { type Request, type Response } from 'express'

import { emailSignup, emailVerify } from '../../application/user-cases/auth/user'
import { type IUserSignupParmeters } from '../../types/types'

export const userSignupController = (
  params: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<void>
    userEmailVerify: (arg1: Request, arg2: Response) => Promise<void>
  } => {
  const userEmailSignup = async (req: Request, res: Response): Promise<void> => {
    const newUser = await emailSignup(req.body, params)
    res.status(201).send(newUser)
  }

  const userEmailVerify = async (req: Request, res: Response): Promise<void> => {
    const isEmailVerified = await emailVerify(req.params.token, params)
    if (isEmailVerified) res.status(200).send('email verified')
    else res.status(400).send('unable to verify')
  }

  return {
    userEmailSignup,
    userEmailVerify
  }
}
