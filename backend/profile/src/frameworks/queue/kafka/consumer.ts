import { type Consumer } from 'kafkajs'
import { KafkaProduceClient } from './kafka'

export class ConsumerFactory {
  private readonly kafkaConfig = new KafkaProduceClient()
  private readonly consumer: Consumer

  constructor () {
    this.consumer = this.consumerInit()
  }

  async connect (): Promise<void> {
    await this.consumer.connect()
}

async consume (topic: string): Promise<void> {
    await this.consumer.subscribe({ topic , fromBeginning: true})
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
          topic: topic,
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers
        })
      }
    })
  }

  private consumerInit (): Consumer {
    return this.kafkaConfig.getClient().consumer({ groupId: 'profile-consumer' })
  }
}
