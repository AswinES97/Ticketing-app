import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import session from 'express-session'
import RedisStore from 'connect-redis'

import { type Application } from 'express'
import { type expressType } from '../types/types'
import { configKeys } from './configKeys'
import { connectRedis } from '../services/redis'
import { type RedisClientType } from 'redis'

export const expressConfig = async (
  app: Application,
  express: expressType
): Promise<void> => {
  if (configKeys.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: ['http://localhost:4200'],
      credentials: true
    })
  )
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(
    mongoSanitize({
      allowDots: true
    })
  )
  app.use(helmet({ xssFilter: true }))

  // for session storage
  const redisClient = await connectRedis() as RedisClientType

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'ticketing:'
  })

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      name: 'accessToken',
      store: redisStore
    })
  )
}
