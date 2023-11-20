import { Kafka } from 'kafkajs'

export class KafkaClient {
  getClient (): Kafka {
    const kafka = new Kafka({
      clientId: 'producer-client',
      brokers: ['localhost:9092']
    })
    return kafka
  }
}
