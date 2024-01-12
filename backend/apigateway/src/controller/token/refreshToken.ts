import { BadRequestError } from '@ticket-common/common'
import { type Request, type Response } from 'express'
import { JwtHsaRsa } from '../../services/jwt'

export const refreshTokenController = (req: Request, res: Response): void => {
  console.log(req.session)
  // const refreshToken = req.session.refreshToken
  // if (refreshToken === undefined) {
  //   throw new BadRequestError('refresh Token Expired')
  // }
  // const JwtHsa = new JwtHsaRsa()
  // const payload = JwtHsa.verify(refreshToken)
  // console.log('refresh token payload: ', payload)
  // if (payload === undefined) {
  //   throw new BadRequestError('refresh token expired')
  // }
  // const data = JSON.parse(payload.sub as string)
  //   const newAccessToken = JwtHsa.accessToken(payload.sub as IUserAttr)
}
