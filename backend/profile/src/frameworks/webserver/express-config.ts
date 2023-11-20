import type { Application } from 'express'
import type { expressType } from '../../types/types'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import configKeys from '../../config/config'

const serverConfig = (
  app: Application,
  express: expressType
): void => {
  // logging
  if (configKeys.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(cors())
  app.use(compression())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(mongoSanitize({
    allowDots: true
  }))
  app.use(helmet({ xssFilter: true }))
}

export { serverConfig }
