import http from 'http'

import app from './frameworks/webserver/server'
import configKeys from './config/config'
import { mongoConnect } from './frameworks/database/mongodb/connection'

const PORT = configKeys.PORT

// create server with http
const server = http.createServer(app)

const startServer = async (): Promise<void> => {
  await mongoConnect()
  server.listen(PORT, () => {
    // Only if environment is development
    if (configKeys.NODE_ENV === 'development') {
      console.log(`auth listening on port ${PORT}`)
    }
  })
}

void startServer()
