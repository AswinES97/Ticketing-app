import { Router } from 'express'
import { userSignupController } from '../../controller/user/user.signup'
import { userEmailVerifyController } from '../../controller/user/user.email-verify'
import { userSigninEmailController } from '../../controller/user/user.signin'
import reqValidator from '../../middlewares/reqValidator'

const authUserRouter = Router()
// auth
authUserRouter.post(
  '/signup/email',
  [
    reqValidator.usernameValidator(),
    reqValidator.emailValidator(),
    reqValidator.passwordValidator(),
    reqValidator.validatorFn
  ],
  userSignupController
)

authUserRouter.get('/signup/email/:token', userEmailVerifyController)

authUserRouter.post(
  '/signin/email',
  [
    reqValidator.emailValidator(),
    reqValidator.passwordValidator(),
    reqValidator.validatorFn
  ],
  userSigninEmailController
)

export default authUserRouter
