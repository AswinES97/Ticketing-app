import { type Request, type Response } from 'express'
import { type UserSignupInterfaceType } from '../../application/repositories/userSignupDBInterface'
import { type UserSignupImplType } from '../../frameworks/database/mongodb/repositories/user.signup'
// import { type IUserAttr } from '../../types/types'

// import { emailSignup } from '../../application/user-cases/auth/user'

export const userSignupController = (
  UserSignupInterface: UserSignupInterfaceType,
  UserSignupImpl: UserSignupImplType
): {
    userEmailSignup: (arg1: Request, arg2: Response) => void
  } => {
  // const dbCall = new UserSignupInterface(new UserSignupImpl())

  const userEmailSignup = (req: Request, res: Response): void => {
    // const userData: IUserAttr = req.body
    // const newUser = await emailSignup(
    //   userData
    // )
  }

  return {
    userEmailSignup
  }
}
