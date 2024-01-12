import { Router } from 'express'
import {
  getUserProfileController,
  updateUsernameController
} from '../../controller/profile/profile.controller'
import reqValidator from '../../middlewares/reqValidator'

const profileUserRouter = Router()

profileUserRouter.get('/', getUserProfileController)
profileUserRouter.patch(
  '/username',
  [
    reqValidator.usernameValidator(),
    reqValidator.validatorFn
  ],
  updateUsernameController
)

export default profileUserRouter
