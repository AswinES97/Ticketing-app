import { type Router } from 'express'
import { type expressType } from '../../../types/types'


export const profileRouter = (express: expressType): Router => {
  const router = express.Router()
  
  router.get('/:id', )

  return router
}
