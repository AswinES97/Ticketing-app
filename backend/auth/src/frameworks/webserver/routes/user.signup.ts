import { type Router } from 'express'
import { type expressType } from '../../../types/types'
import { userSignupController } from '../../../adapters/controllers/user.signup'
import { UserSignupDbInterface } from '../../../application/repositories/userSignupDBInterface'
import { UserSignupImpl } from '../../database/mongodb/repositories/user.signup'

export const userSignupRouter = (express: expressType): Router => {
  const router = express.Router()
  const controller = userSignupController(UserSignupDbInterface, UserSignupImpl)

  router.post('/email', controller.userEmailSignup)

  return router
}
