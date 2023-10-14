import { type Request, type Response } from 'express'
import { type IUserAttr, type IUserSignupParmeters } from '../../types/types'

import { emailSignup } from '../../user-cases/auth/user'

export const userSignupController = (
  params: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<void>
  } => {
  const userEmailSignup = async (req: Request, res: Response): Promise<void> => {
    const inputData: IUserAttr = req.body
    const newUser = await emailSignup(inputData, params)
    res.status(201).send(newUser)
  }

  return {
    userEmailSignup
  }
}
