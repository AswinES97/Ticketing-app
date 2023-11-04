import { type Request, type Response } from 'express'
import { type IUserSignupParmeters } from '../../types/types'

import { emailSignup } from '../../application/user-cases/auth/user'

export const userSignupController = (
  param: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<void>
  } => {
  const userEmailSignup = async (req: Request, res: Response): Promise<void> => {
    const newUser = await emailSignup(
      req.body,
      param
    )

    res.status(201).send(newUser)
  }

  return {
    userEmailSignup
  }
}
