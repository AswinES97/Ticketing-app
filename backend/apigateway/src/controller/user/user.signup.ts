import { type Request, type Response } from 'express'
import { type responseError } from '../../types/types'

import axios, { type AxiosError } from 'axios'
import { BadRequestError } from '@ticket-common/common'
import { configKeys } from '../../config/configKeys'
import { Token } from '../../services/jwt'
import { Mailer } from '../../services/nodemailer'

async function sendMail (userData: ISignupResponse): Promise<void> {
  const jwtHsa = new Token()
  const newToken = jwtHsa.generate(JSON.stringify({ userId: userData.userId }))
  const nodeMailer = new Mailer()
  await nodeMailer.sentMail(userData.email, newToken)
}

const userSignupController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return await axios
    .post(
      `http://${configKeys.AUTH_SRV}:3001/api/v1/auth/user/signup/email`,
      req.body
    )
    .then(async (data) => {
      const userData = data.data.userData as ISignupResponse
      await sendMail(userData)
      return res.status(data.status).json(data.status)
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      throw new BadRequestError(message.error[0].message)
    })
}

export { userSignupController }

interface ISignupResponse {
  userName: string
  userId: string
  email: string
}
