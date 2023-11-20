import { type Consumer, type EachMessagePayload } from 'kafkajs'
import { type KafkaMongDbInterface } from '../../../adapters/Interfaces/repositories/kafkaDbInterface'
import { type consumerKeys } from './topics'
import { type IUserAttr } from '../../../types/types'
import { type kafakEntitiesType } from '../../../entities/user'

import { KafkaClient } from './kafkaConfig'

export class ConsumerFactory {
  private readonly kafkaConfig = new KafkaClient()
  private readonly consumer: Consumer

  constructor () {
    this.consumer = this.consumerInit()
  }

  async connect (): Promise<void> {
    await this.consumer.connect()
  }

  async consume (
    kafkaMongoDbCalls: KafkaMongDbInterface,
    consumerKeys: consumerKeys,
    kafakEntities: kafakEntitiesType
  ): Promise<void> {
    await this.consumer.subscribe({
      topic: 'Auth-Service',
      fromBeginning: false
    })

    await this.consumer.run({
      eachMessage: async ({
        message
      }: EachMessagePayload) => {
        const key = message.key?.toString()
        const value = message.value?.toString()

        switch (key) {
          case consumerKeys.newUser:
            await kafkaMongoDbCalls.createUser(kafakEntities.user(JSON.parse(value as string) as IUserAttr))
            break

          case consumerKeys.emailVerified:
            await kafkaMongoDbCalls.verifyEmail(JSON.parse(value as string))
            break

          default:
            break
        }
      }
    })
  }

  private consumerInit (): Consumer {
    return this.kafkaConfig.getClient().consumer({ groupId: 'profile-consumer' })
  }

  async disconnect (): Promise<void> {
    await this.consumer.disconnect()
  }
}
