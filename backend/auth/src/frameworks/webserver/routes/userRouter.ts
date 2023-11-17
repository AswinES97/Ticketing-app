import { type Application, type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupRouter } from './user.signup'
import { userLoginRouter } from './user.login'

export const userRouter = (app: Application, express: expressType): Router => {
  const router = express.Router()

  router.use('/signup', userSignupRouter(express))

  router.use('/signin', userLoginRouter(express))

  return router
}
