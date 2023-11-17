import { user } from '../../entities/user'
import { type IUserDoc } from '../../frameworks/database/mongodb/model/user'
import { type IUserSignupParmeters, type IUserAttr, type IUserLoginParams } from '../../types/types'

import { BadRequestError } from '@ticket-common/common'

const modifyUserData = async (userData: IUserAttr, dbAndServiceCalls: IUserSignupParmeters): Promise<void> => {
  userData.userId = dbAndServiceCalls.serviceCalls.generateId()
  userData.password = await dbAndServiceCalls.serviceCalls.hashPass(userData.password as string)
}

export const emailSignup = async (userData: IUserAttr, dbAndServiceCalls: IUserSignupParmeters): Promise<IUserDoc> => {
  const hasUser = await dbAndServiceCalls.userDbCalls.doesEmailExist(userData.email as string)

  if (hasUser != null) throw new BadRequestError('Email Already Exist!')

  await modifyUserData(userData, dbAndServiceCalls)

  const userEntity = user(userData)
  const newUser = await dbAndServiceCalls.userDbCalls.emailSignup(userEntity)

  return newUser
}

export const emailLogin = async (userData: IUserAttr, dbAndServiceCalls: IUserLoginParams): Promise<{
  accessToken: string
  refreshToken: string
} | undefined > => {
  const hasUser = await dbAndServiceCalls.userDbCalls.userDetails(userData.email as string)

  if (hasUser === null) {
    console.log('errr')
    return
  }

  if (hasUser?.isEmailVerified as boolean) {
    console.log('not verified')
    return
  }

  if (hasUser.isBlocked as boolean) {
    // todo bocked error
  }

  const isValidPassword = await dbAndServiceCalls.serviceCalls.comparePassword(hasUser?.password as string, userData.password as string)

  if (!isValidPassword) {
    console.log('error wrong password')
  }
  const tokenUserData = JSON.parse(JSON.stringify(hasUser))
  const accessToken = dbAndServiceCalls.serviceCalls.generateAccessToken(tokenUserData)
  const refreshToken = dbAndServiceCalls.serviceCalls.generateRefreshToken(tokenUserData)

  return {
    accessToken,
    refreshToken
  }
}
