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

// Interface for controller parameters/argument objects
export interface IUserSignupParmeters {
  userDbCalls: UserSignupDbInterface
  serviceCalls: UserSignupServiceI
}

// User Entity
export interface IUserEntity {
  userId: () => string
  username: () => string | undefined
  password: () => string | undefined
  email: () => string | undefined
  phone: () => string | undefined
  isBlocked: () => boolean | undefined
  isPhoneVerified: () => boolean | undefined
  isEmailVerified: () => boolean | undefined
}
