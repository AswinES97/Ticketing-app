import { type IUserDoc } from '../../../frameworks/database/mongodb/model/user'
import { UserCheckEmail, UserSignupEmail } from '../../../frameworks/database/mongodb/repositories/user.signup'
import { type IUserAttr } from '../../../types/types'

export class UserSignupDbInterface {
  private readonly signupEmail: UserSignupEmail
  private readonly checkEmil: UserCheckEmail

  constructor () {
    this.signupEmail = new UserSignupEmail()
    this.checkEmil = new UserCheckEmail()
  }

  async emailSignup (userData: IUserAttr): Promise<IUserDoc> {
    return await this.signupEmail.email(userData)
  }

  async doesEmailExist (email: string): Promise<IUserDoc | null> {
    return await this.checkEmil.checkEmail(email)
  }
}
