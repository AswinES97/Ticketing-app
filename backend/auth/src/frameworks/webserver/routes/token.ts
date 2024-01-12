import { type Response, type Request, type Router } from 'express'
import { type expressType } from '../../../types/types'

export const tokenRouter = (express: expressType): Router => {
  const router = express.Router()

  router.get('/refreshAuthToken', (req: Request, res: Response) => {

  })

  return router
}
