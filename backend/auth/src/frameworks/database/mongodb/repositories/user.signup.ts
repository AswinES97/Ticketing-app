import { type IUserDoc, UserModel } from '../model/user'

import { type IUserAttr } from '../../../../types/types'

export class UserSignupEmail {
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

export class UserCheckEmail {
  async checkEmail (email: string): Promise<IUserDoc | null> {
    return await UserModel.findOne({ email })
  }
}
