import http from 'http'

import app from './frameworks/webserver/server'
import configKeys from './config/config'
import { mongoConnect } from './frameworks/database/mongodb/connection'
import { ConsumerFactory } from './frameworks/queue/kafka/consumer'

const PORT = configKeys.PORT

// create server with http
const server = http.createServer(app)

const startServer = async (): Promise<void> => {
  await mongoConnect()

  const kafkaConsumer = await new ConsumerFactory()
  kafkaConsumer.connect()
  kafkaConsumer.consume("New-User")
  
  server.listen(PORT, () => {
    // Only if environment is development
    if (configKeys.NODE_ENV === 'development') {
      console.log(`profile listening on port ${PORT}`)
    }
  })
}

void startServer()
