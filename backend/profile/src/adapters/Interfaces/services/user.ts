import { type JwtPayload } from 'jsonwebtoken'
import { Token, type IUserSignup, Mailer } from '../../../frameworks/services/user'
import { Password, UserId } from '../../../frameworks/services/user'

export class UserSignupServiceI implements IUserSignup {
  private readonly password: Password
  private readonly userId: UserId
  private readonly emailTkn: Token
  private readonly mailer: Mailer

  constructor () {
    this.password = new Password()
    this.userId = new UserId()
    this.emailTkn = new Token()
    this.mailer = new Mailer()
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

  generateToken (userId: string): string {
    return this.emailTkn.generate(userId)
  }

  verifyToken (token: string): string | JwtPayload | undefined {
    return this.emailTkn.verify(token)
  }

  async sentMail (senderMail: string, token: string): Promise<void> {
    await this.mailer.sentMail(senderMail, token)
  }
}
