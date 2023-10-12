// express type
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
