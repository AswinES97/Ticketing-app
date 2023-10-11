import type { Application } from 'express'
import type { expressType } from './types/types'
import type { thirdPartyMiddlewareType } from './server'
import configKeys from '../../config/config'

const serverConfig = (
  app: Application,
  express: expressType,
  middleware: thirdPartyMiddlewareType
): void => {
  // logging
  if (configKeys.NODE_ENV === 'development') {
    app.use(middleware.morgan('dev'))
  }

  app.use(middleware.compression())
  app.use(middleware.helmet())
  app.use(express.json())
}

export { serverConfig }