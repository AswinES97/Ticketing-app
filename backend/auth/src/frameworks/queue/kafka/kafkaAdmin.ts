// import { KafkaClient } from './kafka'
// import { keys } from './topics'

// export class KafkaAdmin {
//   private readonly kafkaConfig: KafkaClient
//   private readonly kafkaAdmin

//   constructor () {
//     this.kafkaConfig = new KafkaClient()
//     this.kafkaAdmin = this.kafkaConfig.getClient().admin()
//   }

//   async connect (): Promise<void> {
//     await this.kafkaAdmin.connect()
//   }

//   async setTopic (): Promise<void> {
//     await this.connect()
//     await this.kafkaAdmin.createTopics({
//       topics: [{
//         topic: keys.emailVerified
//       }]
//     })
//     await this.disconnect()
//   }

//   async disconnect (): Promise<void> {
//     await this.kafkaAdmin.disconnect()
//   }
// }
