import express from 'express'

import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import 'express-async-errors'


import { errorHandlingMiddleware } from '@ticket-common/common'

import { serverConfig } from './express-config'
import router from './routes'

// for passing as argument
const thirdPartyMiddleware = {
  cors,
  helmet,
  compression,
  morgan,
  mongoSanitize,
  cookieParser
}

const app = express()

// configuring express app
serverConfig(app, express, thirdPartyMiddleware)

router(app, express)

app.use(errorHandlingMiddleware)

export default app
export type thirdPartyMiddlewareType = typeof thirdPartyMiddleware
