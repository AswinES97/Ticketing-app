import { type Router } from 'express'
import { type expressType } from '../../../types/types'

import { userProfileController } from '../../../adapters/controllers/profileController'
import { UserProfile } from '../../../adapters/Interfaces/repositories/profile'

export const userProfileRouter = (express: expressType): Router => {
  const router = express.Router()

  const controller = userProfileController({
    userDbCalls: new UserProfile()
  })

  router.get('/:userId', controller.getUserProfileData)

  return router
}
