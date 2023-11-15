import { type Consumer } from 'kafkajs'
import { KafkaProduceClient } from './kafka'

export class ConsumerFactory {
  private readonly kafkaConfig = new KafkaProduceClient()
  private readonly consumer: Consumer

  constructor () {
    this.consumer = this.consumerInit()
  }

  async connect (topic: string): Promise<void> {
    await this.consumer.connect()
    await this.consumer.subscribe({ topics: [topic] })
  }

  async consume (): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log({
          key: message.key?.toString(),
          value: message.value?.toString(),
          headers: message.headers
        })
      }
    })
  }

  private consumerInit (): Consumer {
    return this.kafkaConfig.getClient().consumer({ groupId: 'my-group' })
  }
}
