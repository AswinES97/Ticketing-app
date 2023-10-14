// express type

import { type UserSignupDbInterface } from '../adapters/Interfaces/repositories/userSignupDBInterface'
import { type UserSignupServiceI } from '../adapters/Interfaces/services/user'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type expressType = typeof import('express')

export interface IUserAttr {
  userId: string
  username?: string
  email?: string
  phone?: string
  password?: string
  isblocked: boolean
  isPhoneVerified?: boolean
  isEmailVerified?: boolean
}

export interface IUserSignupParmeters {
  userDbCalls: UserSignupDbInterface
  serviceCalls: UserSignupServiceI
}
