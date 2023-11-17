import { KafkaProduceClient } from './kafka'
import { type Admin } from 'kafkajs'

export class KafkaAdmin {
  private readonly kafkaConfig = new KafkaProduceClient()

  async connectAdmin (): Promise<Admin> {
    const admin = this.kafkaConfig.getClient().admin()
    await admin.connect()
    return admin
  }

  async createTopic (topic: string): Promise<void> {
    const admin = await this.connectAdmin()
    await admin.createTopics({
      topics: [{
        topic,
        numPartitions: 2
      }]
    })
    await admin.disconnect()
  }

  async disconnectAdmin (): Promise<void> {
    await (await this.connectAdmin()).disconnect()
  }
}
