import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { FindUserImpl } from '../../../frameworks/database/mongodb/repositories/user.signup'

export class FindUserI {
  private readonly repository: FindUserImpl

  constructor () {
    this.repository = new FindUserImpl()
  }

  async email (email: string): Promise<IUserDoc | null> {
    return await this.repository.email(email)
  }
}
