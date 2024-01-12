import { Password } from '../../../frameworks/services/user'

export class UserLoginServiceI {
  private readonly password: Password

  constructor () {
    this.password = new Password()
  }

  async comparePassword (storedPassword: string, userInputPassword: string): Promise<boolean> {
    return await this.password.compare(storedPassword, userInputPassword)
  }
}
