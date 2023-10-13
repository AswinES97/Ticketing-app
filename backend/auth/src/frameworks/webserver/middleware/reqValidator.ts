import { type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'

const reqValidator = {
  emailValidator: () => body('email')
    .isEmail(),
  validatorFn: (req: Request, res: Response) => {
    // const errors = validationResult(req)
    // if(errors.isEmpty())
  }
}

export default reqValidator
