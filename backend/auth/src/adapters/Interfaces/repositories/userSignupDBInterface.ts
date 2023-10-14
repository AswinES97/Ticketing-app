import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { UserSignupDbImpl } from '../../../frameworks/database/mongodb/repositories/user.signup'
import { type IUserEntity } from '../../../types/types'

export class UserSignupDbI {
  private readonly repository: UserSignupDbImpl

  constructor () {
    this.repository = new UserSignupDbImpl()
  }

  async emailSignup (userData: IUserEntity): Promise<IUserDoc> {
    return await this.repository.email(userData)
  }
}
