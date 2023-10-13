import { type Request, type Response } from 'express'
import { type UserSignupInterfaceType } from '../../application/repositories/userSignupDBInterface'
import { type UserSignupImplType } from '../../frameworks/database/mongodb/repositories/user.signup'

export const userSignupController = (
  UserSignupInterface: UserSignupInterfaceType,
  UserSignupImpl: UserSignupImplType
): {
    userEmailSignup: (arg1: Request, arg2: Response) => void
  } => {
  // const dbCall = new UserSignupInterface(new UserSignupImpl())

  const userEmailSignup = (req: Request, res: Response): void => {
    res.status(200).send('hi')
  }

  return {
    userEmailSignup
  }
}
