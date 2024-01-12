import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userLoginController } from '../../../adapters/controllers/user.signin'
import { UserLoginDBInterface } from '../../../adapters/Interfaces/repositories/userLoginDBInterface'
import { UserLoginServiceI } from '../../../adapters/Interfaces/services/user.login'

export const userLoginRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userLoginController({
    userDbCalls: new UserLoginDBInterface(),
    serviceCalls: new UserLoginServiceI()
  })

  router.post('/email', controller.userEmailLogin)

  return router
}
