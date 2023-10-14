import { type IUserSignupParmeters, type IUserAttr } from '../../types/types'

import { BadRequestError } from '@ticket-common/common'

export const emailSignup = async (userData: IUserAttr, dbAndServiceCalls: IUserSignupParmeters): Promise<IUserAttr> => {
  const hasUser = await dbAndServiceCalls.findUserDBCalls.email(userData.email as string)
  console.log(hasUser)

  if (hasUser != null) throw new BadRequestError('Email Already Exist!')

  userData.password = await dbAndServiceCalls.serviceCalls.hashPass(userData.password as string)

  return userData
}
