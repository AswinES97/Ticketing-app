import { BadRequestError } from '@ticket-common/common'
import { user } from '../../../entities/user'

import { type IUserSignupParmeters, type IUserAttr } from '../../../types/types'

export const emailSignup = async (userData: IUserAttr, userSignup: IUserSignupParmeters): Promise<void> => {
  const hasEmail = await userSignup.userDbCalls.doesEmailExist(userData.email as string)

  if (hasEmail !== null) throw new BadRequestError('Email Already Exist')

  userData.userId = userSignup.serviceCalls.generateId()
  userData.password = await userSignup.serviceCalls.hashPass(userData.password as string)

  const newUser = user(userData)

  await userSignup.userDbCalls.emailSignup(newUser)

  const keys = userSignup.kafkaCalls.getKeys().newUser
  await userSignup.kafkaCalls.produce(userData, keys)

  const token = userSignup.serviceCalls.generateToken(newUser.userId())
  await userSignup.serviceCalls.sentMail(userData.email as string, token)
}

export const emailVerify = async (token: string | undefined, userSignup: IUserSignupParmeters): Promise<boolean> => {
  if (token === undefined) throw new Error('token undefined')

  const userId = userSignup.serviceCalls.verifyToken(token)
  const isUpdate = await userSignup.userDbCalls.verifiedEmail(userId as string)

  if (isUpdate === null) return false

  const keys = userSignup.kafkaCalls.getKeys().emailVerified
  await userSignup.kafkaCalls.produce(isUpdate.userId, keys)

  return true
}
