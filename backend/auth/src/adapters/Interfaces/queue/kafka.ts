import ProducerFactory from '../../../frameworks/queue/kafka/producer'
import { keys, type proudcerKeys } from '../../../frameworks/queue/kafka/topics'

import { type IUserAttr, type IKafka } from '../../../types/types'

export class KafkaInterface implements IKafka {
  private readonly kafkaProducer: ProducerFactory
  private readonly producerTopics: proudcerKeys

  constructor () {
    this.kafkaProducer = new ProducerFactory()
    this.producerTopics = keys
  }

  async produce (userdata: IUserAttr | string, key: string): Promise<void> {
    await this.kafkaProducer.send(userdata, key)
  }

  getKeys (): proudcerKeys {
    return this.producerTopics
  }
}
