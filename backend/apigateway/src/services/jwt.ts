import jwt, { type JwtPayload } from 'jsonwebtoken'
import { configKeys } from '../config/configKeys'
import { type IJwtHsaSub } from '../types/types'

export class Token {
  generate (data: string): string | any {
    // Todo error for not generating token
    return jwt.sign({ sub: data }, configKeys.JWT_SECRET, { expiresIn: '1h' })
  }

  verify (token: string): string | JwtPayload | undefined {
    try {
      return jwt.verify(token, configKeys.JWT_SECRET)
    } catch (err) {
      // todo - error for verify
      console.log('jwt verify error')
      throw new Error('Token Expired')
    }
  }
}

export class JwtHsaRsa {
  accessToken (data: IJwtHsaSub): string {
    return jwt.sign(
      {
        sub: data,
        // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, // 15 min
        exp: Math.floor(Date.now() / 1000) + 60, // 60sec
        // exp: Math.floor(Date.now() / 1000) + 60,
        iat: Math.floor(Date.now() / 1000)
      },
      configKeys.JWT_PRIVATE_KEY,
      { algorithm: 'RS256' }
    )
  }

  refreshToken (data: IJwtHsaSub): string {
    return jwt.sign(
      {
        sub: data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15, // 15 days
        // exp: Math.floor(Date.now() / 1000) + 120,

        iat: Math.floor(Date.now() / 1000)
      },
      configKeys.JWT_PRIVATE_KEY,
      { algorithm: 'RS256' }
    )
  }

  verify (token: string): JwtPayload | undefined | string {
    try {
      return jwt.verify(token, configKeys.JWT_PUBLIC_KEY)
    } catch (err) {
      console.log(err)
      return undefined
    }
  }
}
