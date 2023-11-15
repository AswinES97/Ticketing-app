import { type Kafka, type Producer } from 'kafkajs'
import { KafkaProduceClient } from './kafka'
import { type IUserAttr } from '../../../types/types'

export default class ProducerFactory {
  private readonly producer: Producer
  private readonly kafkaConfig = new KafkaProduceClient()

  constructor () {
    this.producer = this.createProducer(this.kafkaConfig.getClient())
  }

  public async start (): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown (): Promise<void> {
    await this.producer.disconnect()
  }

  public async send (userData: IUserAttr): Promise<void> {
    await this.start()

    const topic = {
      topic: 'New-User',
      messages: [{
        value: JSON.stringify(userData)
      }]
    }
    await this.producer.send(topic)

    await this.shutdown()
  }

  private createProducer (kafka: Kafka): Producer {
    return kafka.producer()
  }
}
