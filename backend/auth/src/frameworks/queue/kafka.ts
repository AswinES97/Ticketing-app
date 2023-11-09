import { Kafka, type Producer } from 'kafkajs'
// import { type IUserAttr } from '../../types/types'

export default class ProducerFactory {
  private readonly producer: Producer

  constructor () {
    this.producer = this.createProducer()
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

  public async send (messages: string): Promise<void> {
    await this.producer.send({
      topic: 'New-User',
      messages: [{
        value: JSON.stringify(messages)
      }]
    })
  }

  private createProducer (): Producer {
    const kafka = new Kafka({
      clientId: 'producer-client',
      brokers: ['localhost:9092']
    })

    return kafka.producer()
  }
}
