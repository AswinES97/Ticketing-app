import 'express-async-errors'

import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupController } from '../../../adapters/controllers/user.signup'

import { UserSignupDbI } from '../../../adapters/Interfaces/repositories/userSignupDBInterface'
import { UserSignupServiceI } from '../../../adapters/Interfaces/services/user'

import reqValidator from '../middleware/reqValidator'
import { FindUserI } from '../../../adapters/Interfaces/repositories/userFindDBImpl'

export const userSignupRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userSignupController({
    userDbCalls: new UserSignupDbI(),
    findUserDBCalls: new FindUserI(),
    serviceCalls: new UserSignupServiceI()
  })

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
