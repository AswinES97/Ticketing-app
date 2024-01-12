import express, { type Request, type Response } from 'express'
import { expressConfig } from './config/express-config'
import { NotFoundError, errorHandlingMiddleware } from '@ticket-common/common'
import mainRouter from './routes'

const app = express()
void expressConfig(app, express)

app.use('/api/v1/', mainRouter)

app.use('/*', (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandlingMiddleware)

export default app
