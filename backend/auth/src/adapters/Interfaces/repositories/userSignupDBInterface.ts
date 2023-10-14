import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { UserSignupDbImpl } from '../../../frameworks/database/mongodb/repositories/user.signup'
import { type IUserAttr } from '../../../types/types'

export class UserSignupDbInterface {
  private readonly repository: UserSignupDbImpl

  constructor () {
    this.repository = new UserSignupDbImpl()
  }

  async emailSignup (userData: IUserAttr): Promise<IUserDoc> {
    return await this.repository.email(userData)
  }
}

export type UserSignupInterfaceType = typeof UserSignupDbInterface
