import { type NextFunction, type Request, type Response } from 'express'

import { ReqValidationError } from '@ticket-common/common'
import { body, validationResult } from 'express-validator'

const reqValidator = {
  emailValidator: () => {
    return body('email')
      .isEmail()
  },
  passwordValidator: () => {
    return body('password')
      .trim()
      .notEmpty()
      .custom(value => {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/.test(value)
      })
  },
  validatorFn: (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new ReqValidationError(errors.array())
    next()
  }
}

export default reqValidator
