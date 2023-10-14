import { type IUserSignup } from '../../../frameworks/services/user'
import { Password, UserId } from '../../../frameworks/services/user'

export class UserSignupServiceI implements IUserSignup {
  private readonly password: Password
  private readonly userId: UserId

  constructor () {
    this.password = new Password()
    this.userId = new UserId()
  }

  async hashPass (userPassword: string): Promise<string> {
    return await this.password.hash(userPassword)
  }

  async comparePass (dbPassword: string, inputPassword: string): Promise<boolean> {
    return await this.password.compare(dbPassword, inputPassword)
  }

  generateId (): string {
    return this.userId.create()
  }
}
