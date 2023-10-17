import { type FindUserI } from '../adapters/Interfaces/repositories/userFindDBImpl'
import { type UserSignupDbI } from '../adapters/Interfaces/repositories/userSignupDBInterface'
import { type UserSignupServiceI } from '../adapters/Interfaces/services/user'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type expressType = typeof import('express')

export interface IUserAttr {
  userId?: string
  username?: string
  email?: string
  phone?: string
  password?: string
  isblocked: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
}

export interface IUserSignupParmeters {
  userDbCalls: UserSignupDbI
  findUserDBCalls: FindUserI
  serviceCalls: UserSignupServiceI
}

export interface IUserEntity {
  userId: () => string | undefined
  username: () => string | undefined
  password: () => string | undefined
  email: () => string | undefined
}
