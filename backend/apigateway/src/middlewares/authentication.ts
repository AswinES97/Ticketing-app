import { type NextFunction, type Request, type Response } from 'express'
import { JwtHsaRsa } from '../services/jwt'
import { UnauthorizedError } from '@ticket-common/common'
import { type IJwtHsaSub } from '../types/types'

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1]
  const tokenHsa = new JwtHsaRsa()
  const payload = tokenHsa.verify(token as string)
  if (payload === undefined) {
    throw new UnauthorizedError('access token expired')
  }

  const userData = payload.sub as unknown as IJwtHsaSub
  if (userData.role === 'user') {
    req.body.user = userData
    next()
  }
}
