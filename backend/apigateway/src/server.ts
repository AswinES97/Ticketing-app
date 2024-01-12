import http from 'node:http'
import dotenv from 'dotenv'
import 'express-async-errors'

import { configKeys } from './config/configKeys'
import app from './app'

dotenv.config()

const server = http.createServer(app)
const PORT = configKeys.PORT

const startServer = async (): Promise<void> => {
  server.listen(PORT, () => {
    console.log(server.address())
  })
}

void startServer()
