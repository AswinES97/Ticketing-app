import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { type Request, type Response } from 'express'
import { type IJwtHsaSub, type IUserAttr, type responseError } from '../../types/types'
import { BadRequestError } from '@ticket-common/common'
import { JwtHsaRsa } from '../../services/jwt'

declare module 'express-session' {
  interface SessionData {
    refreshToken: string
  }
}

export const userSigninEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return await axios
    .post(
      `http://${process.env.AUTH_SRV}:3001/api/v1/auth/user/signin/email`,
      req.body
    )
    .then((response: AxiosResponse) => {
      const resData = response.data as IUserAttr
      const userData: IJwtHsaSub = {
        username: resData.username as string,
        userId: resData.userId,
        role: 'user'
      }
      const tokens = refreshAndAccessToken(userData)
      console.log(req.session)
      req.session.refreshToken = tokens.refreshToken

      return res
        .status(response.status)
        .json({ accessToken: tokens.accessToken })
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}

function refreshAndAccessToken (userData: IJwtHsaSub): {
  accessToken: string
  refreshToken: string
} {
  const tokenRsa = new JwtHsaRsa()
  return {
    accessToken: tokenRsa.accessToken(userData),
    refreshToken: tokenRsa.refreshToken(userData)
  }
}
