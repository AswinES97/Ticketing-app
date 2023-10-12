import { type IUserDoc, UserModel } from '../model/user'

import { type IUserAttr } from '../../../../types/types'

export class UserSignupImpl {
  async email (userData: IUserAttr): Promise<IUserDoc> {
    const user = new UserModel({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      password: userData.password
    })

    return await user.save()
  }
}

export type UserSignupImplType = typeof UserSignupImpl
