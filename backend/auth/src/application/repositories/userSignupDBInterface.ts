import { type IUserDoc } from '../../frameworks/database/mongodb/model/user'
import { type UserSignupImpl } from '../../frameworks/database/mongodb/repositories/user.signup'
import { type IUserAttr } from '../../types/types'

export class UserSignupDbInterface {
  constructor (private readonly repository: UserSignupImpl) {}

  async emailSignup (userData: IUserAttr): Promise<IUserDoc> {
    return await this.repository.email(userData)
  }
}

export type UserSignupInterfaceType = typeof UserSignupDbInterface
