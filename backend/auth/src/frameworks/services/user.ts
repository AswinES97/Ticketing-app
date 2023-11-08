import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import { v4 as uuidv4 } from 'uuid'
import configKeys from '../../config/config'

const scryptAsync = promisify(scrypt)

export class Password {
  async hash (password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer
    return `${buf.toString('hex')}.${salt}}`
  }

  async compare (storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split('.')
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer
    return buf.toString('hex') === hashedPassword
  }
}

export class UserId {
  create (): string {
    return uuidv4()
  }
}

export class Token {
  generate (data: string): string | any {
    // Todo error for not generating token
    return jwt.sign(data, configKeys.JWT_SECRET)
  }

  verify (token: string): string | JwtPayload | undefined {
    try {
      return jwt.verify(token, configKeys.JWT_SECRET)
    } catch (err) {
      // todo - error for verify
      console.log('jwt verify error')
    }
  }
}

export class Mailer {
  // Todo set config in somewhere else
  async sentMail (senderMail: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'aswin.ticketing@gmail.com',
        pass: configKeys.NODE_MAILER_PASS
      }
    })

    await transporter.sendMail({
      from: '"Ticketing" aswin.ticketing@gmail.com', // sender address
      to: senderMail, // list of receivers
      subject: 'Ticketing Verification', // Subject line
      text: `Please verify your email by clicking ${configKeys.BASE_URL}/signup/verify-email/${token}` // plain text body
    })
  }
}

export interface IUserSignup {
  hashPass: (arg1: string) => Promise<string>
  comparePass: (arg1: string, arg2: string) => Promise<boolean>
  generateId: () => string
  generateToken: (arg1: string) => string
  sentMail: (agr1: string, arg2: string) => Promise<void>
  verifyToken: (arg1: string) => string | JwtPayload | undefined
}
