import express, { type Request, type Response } from 'express'

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

app.get('/api/auth/hi', (req: Request, res: Response) => {
  res.send('hi')
})

export default app
export type thirdPartyMiddlewareType = typeof thirdPartyMiddleware
