import { Request, type Application, type Router, Response } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupRouter } from './user.signup'

export const userRouter = (app: Application, express: expressType): Router => {
  const router = express.Router()

  router.use('/signup', userSignupRouter(express))
  
  router.post('/login', (req: Request, res: Response) => {
    console.log(req.body);
    
  })

  return router
}
