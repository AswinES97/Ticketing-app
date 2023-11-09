import ProducerFactory from '../../../frameworks/queue/kafka'
// import { type IUserAttr } from '../../../types/types'

export class KafkaInterface {
  private readonly kafkaProducer: ProducerFactory

  constructor () {
    this.kafkaProducer = new ProducerFactory()
  }

  async send (message: string): Promise<void> {
    await this.kafkaProducer.send(message)
  }
}
