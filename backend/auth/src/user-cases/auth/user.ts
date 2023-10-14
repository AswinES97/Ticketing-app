import { user } from '../../entities/user'
import { type IUserDoc } from '../../frameworks/database/mongodb/model/user'
import { type IUserSignupParmeters, type IUserAttr } from '../../types/types'

import { BadRequestError } from '@ticket-common/common'

const modifyUserData = async (userData: IUserAttr, dbAndServiceCalls: IUserSignupParmeters): Promise<void> => {
  userData.userId = dbAndServiceCalls.serviceCalls.generateId()
  userData.password = await dbAndServiceCalls.serviceCalls.hashPass(userData.password as string)
}

export const emailSignup = async (userData: IUserAttr, dbAndServiceCalls: IUserSignupParmeters): Promise<IUserDoc> => {
  const hasUser = await dbAndServiceCalls.findUserDBCalls.email(userData.email as string)

  if (hasUser != null) throw new BadRequestError('Email Already Exist!')

  await modifyUserData(userData, dbAndServiceCalls)

  const userEntity = user(userData)
  const newUser = await dbAndServiceCalls.userDbCalls.emailSignup(userEntity)

  return newUser
}
