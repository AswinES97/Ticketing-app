import express from 'express'

import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import { errorHandlingMiddleware } from '@ticket-common/common'

import { serverConfig } from './express-config'
import router from './routes'

// for passing as argument
const thirdPartyMiddleware = {
  helmet,
  compression,
  morgan
}

const app = express()

// configuring express app
serverConfig(app, express, thirdPartyMiddleware)

router(app, express)

app.use(errorHandlingMiddleware)

export default app
export type thirdPartyMiddlewareType = typeof thirdPartyMiddleware
