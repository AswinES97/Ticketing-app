import { Kafka } from 'kafkajs'

export class KafkaClient {
  getClient (): Kafka {
    const kafka = new Kafka({
      clientId: 'auth',
      // brokers: ['kafka:9092']
      brokers: ['localhost:9092']
    })
    return kafka
  }
}
