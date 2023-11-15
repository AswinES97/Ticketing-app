import { KafkaAdmin } from '../../../frameworks/queue/kafka/admin'
import ProducerFactory from '../../../frameworks/queue/kafka/producer'

import { type IUserAttr, type IKafka } from '../../../types/types'

export class KafkaInterface implements IKafka {
  private readonly kafkaAdmin = new KafkaAdmin()
  private readonly kafkaProducer = new ProducerFactory()

  async newtopic (topic: string): Promise<void> {
    await this.kafkaAdmin.createTopic(topic)
  }

  async produce (userata: IUserAttr): Promise<void> {
    await this.kafkaProducer.send(userata)
  }
}
