// create server with http
import http from 'http'

import app from './frameworks/webserver/server'
import configKeys from './config/config'
import { mongoConnect } from './frameworks/database/mongodb/connection'

const PORT = configKeys.PORT
const server = http.createServer(app)

const startServer = async (): Promise<void> => {
  await mongoConnect()
  server.listen(PORT, () => {
    if (configKeys.NODE_ENV === 'development') {
      console.log(`auth listening on port ${PORT}`)
    }
  })
}

void startServer()
