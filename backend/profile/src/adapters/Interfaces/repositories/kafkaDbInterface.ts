import { User, Verify } from '../../../frameworks/database/mongodb/repositories/profile'
import { type IKafkaDbMongo, type IUserEntity } from '../../../types/types'

export class KafkaMongDbInterface implements IKafkaDbMongo {
  private readonly user: User
  private readonly verify: Verify
  constructor () {
    this.user = new User()
    this.verify = new Verify()
  }

  async createUser (userData: IUserEntity): Promise<void> {
    await this.user.create(userData)
  }

  async verifyEmail (userId: string): Promise<void> {
    await this.verify.email(userId)
  }
}
