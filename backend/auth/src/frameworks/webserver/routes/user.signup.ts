import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupController } from '../../../adapters/controllers/user.signup'

import { UserSignupDbInterface } from '../../../application/repositories/userSignupDBInterface'
import { UserSignupImpl } from '../../database/mongodb/repositories/user.signup'
import reqValidator from '../middleware/reqValidator'

export const userSignupRouter = (express: expressType): Router => {
  const router = express.Router()
  const controller = userSignupController(UserSignupDbInterface, UserSignupImpl)

  router.post('/email',
    [
      reqValidator.usernameValidator(),
      reqValidator.emailValidator(),
      reqValidator.passwordValidator(),
      reqValidator.validatorFn
    ],
    controller.userEmailSignup
  )

  return router
}
