import { Kafka } from 'kafkajs'

export class KafkaClient {
  getClient (): Kafka {
    const kafka = new Kafka({
      clientId: 'profile',
      // brokers: ['kafka:9092']
      brokers: ['localhost:9092']
    })
    return kafka
  }
}
