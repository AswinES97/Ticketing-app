import { type IUserEntity } from '../../../../types/types'
import { type IUserDoc, UserModel } from '../model/user'

export class User {
  async create (userData: IUserEntity): Promise<void> {
    const newUser = new UserModel({
      userId: userData.userId(),
      username: userData.username(),
      password: userData.password(),
      email: userData.email(),
      phone: userData.phone(),
      gender: userData.gender(),
      img: userData.img(),
      isBlocked: userData.isBlocked(),
      isPhoneVerified: userData.isPhoneVerified(),
      isEmailVerified: userData.isEmailVerified()
    })
    await newUser.save()
  }
}

export class Verify {
  async email (userId: string): Promise<IUserDoc | null> {
    return await UserModel.findOneAndUpdate({ userId }, { $set: { isEmailVerified: true } }, { returnNewDocument: true })
  }
}
