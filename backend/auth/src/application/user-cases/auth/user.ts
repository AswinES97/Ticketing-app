import { BadRequestError } from '@ticket-common/common'
import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { type IUserSignupParmeters, type IUserAttr } from '../../../types/types'

export const emailSignup = async (userData: IUserAttr, userSignup: IUserSignupParmeters): Promise<IUserDoc> => {
  const hasEmail = await userSignup.userDbCalls.doesEmailExist(userData.email as string)

  if (hasEmail !== null) throw new BadRequestError('Email Already Exist')

  userData.userId = userSignup.serviceCalls.generateId()
  return await userSignup.userDbCalls.emailSignup(userData)
}
