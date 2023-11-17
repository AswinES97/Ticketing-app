import { type JwtPayload } from 'jsonwebtoken'
import { JwtHsaRsa, Password } from '../../../frameworks/services/user'
import { type IUserAttr } from '../../../types/types'

export class UserLoginServiceI {
  private readonly password: Password
  private readonly JwtHsaRsa: JwtHsaRsa

  constructor () {
    this.password = new Password()
    this.JwtHsaRsa = new JwtHsaRsa()
  }

  async comparePassword (storedPassword: string, userInputPassword: string): Promise<boolean> {
    return await this.password.compare(storedPassword, userInputPassword)
  }

  generateAccessToken (data: IUserAttr): string {
    return this.JwtHsaRsa.accessToken(data)
  }

  generateRefreshToken (data: IUserAttr, role: string = 'USER'): string {
    return this.JwtHsaRsa.generateRefreshToken(data, role)
  }

  verifyToken (token: string): JwtPayload | string | undefined {
    return this.JwtHsaRsa.verify(token)
  }
}
