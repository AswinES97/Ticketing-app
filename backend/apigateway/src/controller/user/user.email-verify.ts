import axios, { type AxiosError, type AxiosResponse } from 'axios'
import { type Request, type Response } from 'express'
import { type responseError } from '../../types/types'
import { BadRequestError, ConfilctError } from '@ticket-common/common'
import { Token } from '../../services/jwt'

export const userEmailVerifyController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.params.token
  const jwtHsa = new Token()
  const payload: IPayloadData = JSON.parse(jwtHsa.verify(token)?.sub as string)
  return await axios
    .get(
      `http://${process.env.AUTH_SRV}:3001/api/v1/auth/user/signup/email?userId=${payload.userId}`
    )
    .then((data: AxiosResponse) => {
      return res.status(data.status).json(data.data)
    })
    .catch((err: AxiosError) => {
      const message = err.response?.data as responseError
      if ((err.response?.status === 409)) {
        throw new ConfilctError(message.error[0].message)
      }
      throw new BadRequestError(message.error[0].message)
    })
}

interface IPayloadData {
  userId: string
}
