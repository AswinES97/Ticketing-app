import 'express-async-errors'

import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userSignupController } from '../../../adapters/controllers/user.signup'

import { UserSignupDbInterface } from '../../../adapters/Interfaces/repositories/userSignupDBInterface'
import { UserSignupServiceI } from '../../../adapters/Interfaces/services/user'

import reqValidator from '../middleware/reqValidator'
import { KafkaInterface } from '../../../adapters/Interfaces/queue/kafka'

export const userSignupRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userSignupController({
    userDbCalls: new UserSignupDbInterface(),
    serviceCalls: new UserSignupServiceI(),
    kafkaCalls: new KafkaInterface()
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

  router.get('/verify-email/:token', controller.userEmailVerify)

  return router
}
