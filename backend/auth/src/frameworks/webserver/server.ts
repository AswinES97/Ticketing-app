import express from 'express'

import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'

import { serverConfig } from './express-config'

// for passing as argument
const thirdPartyMiddleware = {
  helmet,
  compression,
  morgan
}

const app = express()

serverConfig(app, express, thirdPartyMiddleware)

export default app
export type thirdPartyMiddlewareType = typeof thirdPartyMiddleware
