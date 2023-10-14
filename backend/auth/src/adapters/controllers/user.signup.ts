import { type Request, type Response } from 'express'
import { type IUserSignupParmeters } from '../../types/types'
// import { type IUserAttr } from '../../types/types'

// import { emailSignup } from '../../application/user-cases/auth/user'

export const userSignupController = (
  param: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => void
  } => {
  const userEmailSignup = (req: Request, res: Response): void => {
    res.send(param.serviceCalls.generateId())

    // const userData: IUserAttr = req.body
    // const newUser = await emailSignup(
    //   userData
    // )
  }

  return {
    userEmailSignup
  }
}
