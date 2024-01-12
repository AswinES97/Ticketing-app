import { emailSignup, emailVerify } from '../../user-cases/auth/user.signup'

import { type Request, type Response } from 'express'
import { type IUserSignupParmeters } from '../../types/types'
import { NotFoundError } from '@ticket-common/common'

export const userSignupController = (
  params: IUserSignupParmeters
): {
    userEmailSignup: (arg1: Request, arg2: Response) => Promise<Response>
    userEmailVerify: (arg1: Request, arg2: Response) => Promise<Response>
  } => {
  const userEmailSignup = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userData = await emailSignup(req.body, params)
    return res.status(201).send({
      status: 'user created',
      userData: { userName: userData.username, userId: userData.userId, email: userData.email }
    })
  }

  const userEmailVerify = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const isEmailVerified = await emailVerify(req.query?.userId as string, params)

    if (isEmailVerified) {
      return res.status(200).send({ status: 'email verified' })
    }
    throw new NotFoundError('Unable to Verify Email')
  }

  return {
    userEmailSignup,
    userEmailVerify
  }
}
