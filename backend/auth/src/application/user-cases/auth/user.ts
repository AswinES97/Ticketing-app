import { BadRequestError } from '@ticket-common/common'
import { user } from '../../../entities/user'

import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { type IUserSignupParmeters, type IUserAttr } from '../../../types/types'

export const emailSignup = async (userData: IUserAttr, userSignup: IUserSignupParmeters): Promise<IUserDoc> => {
  const hasEmail = await userSignup.userDbCalls.doesEmailExist(userData.email as string)

  if (hasEmail !== null) throw new BadRequestError('Email Already Exist')

  userData.userId = userSignup.serviceCalls.generateId()
  userData.password = await userSignup.serviceCalls.hashPass(userData.password as string)

  await userSignup.kafkaCalls.newtopic('New-User')
  await userSignup.kafkaCalls.produce(userData)
  const newUser = user(userData)

  const token = userSignup.serviceCalls.generateToken(newUser.userId())

  await userSignup.serviceCalls.sentMail(userData.email as string, token)
  return await userSignup.userDbCalls.email(newUser)
}

export const emailVerify = async (token: string | undefined, userSignup: IUserSignupParmeters): Promise<boolean> => {
  if (token === undefined) throw new Error('token undefined')

  const userId = userSignup.serviceCalls.verifyToken(token)
  const isUpdate = await userSignup.userDbCalls.verifiedEmail(userId as string)

  if (isUpdate === null) return false
  return true
}
