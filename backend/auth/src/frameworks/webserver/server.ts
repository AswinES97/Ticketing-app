import express from 'express'

import { errorHandlingMiddleware } from '@ticket-common/common'

import router from './routes'
import server from '../..'
import configKeys from '../../config/config'
import { mongoConnect } from '../database/mongodb/connection'
import { serverConfig } from './express-config'
import { KafkaConsumerInterface } from '../../adapters/Interfaces/queue/kafka'
import { KafkaMongDbInterface } from '../../adapters/Interfaces/repositories/kafkaDbInterface'
import { keys } from '../queue/kafka/topics'
import { kafkaConsumerController } from '../../adapters/controllers/kafka'

const PORT = configKeys.PORT

const app = express()

// configuring express app
serverConfig(app, express)

router(app, express)

app.use(errorHandlingMiddleware)

const startServer = async (): Promise<void> => {
  await mongoConnect()

  server.listen(PORT, () => {
    // Only if environment is development
    if (configKeys.NODE_ENV === 'development') {
      console.log(`auth listening on port ${PORT}`)
    }
  })

  await kafkaConsumerController({
    kafaCalls: new KafkaConsumerInterface(),
    kakfaMongDbCalls: new KafkaMongDbInterface(),
    consumerKeys: keys
  })
}

void startServer()

export default app
