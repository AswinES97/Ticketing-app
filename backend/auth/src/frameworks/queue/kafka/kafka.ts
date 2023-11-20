import { Kafka } from 'kafkajs'

export class KafkaProduceClient {
  getClient (): Kafka {
    const kafka = new Kafka({
      clientId: 'auth-producer',
      brokers: ['localhost:9092']
    })
    return kafka
  }
}

export class KafkaConsumerClient {
  getClient (): Kafka {
    const kafka = new Kafka({
      clientId: 'auth-consumer',
      brokers: ['localhost:9092']
    })
    return kafka
  }
}
