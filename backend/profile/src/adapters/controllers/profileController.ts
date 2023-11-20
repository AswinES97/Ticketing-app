import { type Request, type Response } from 'express'
import { type IProfileControllerParams } from '../../types/types'
import { getUserInfo } from '../../application/user-cases/user'
import { BadRequestError } from '@ticket-common/common'

export const userProfileController = (params: IProfileControllerParams): {
  getUserProfileData: (agr1: Request, arg2: Response) => Promise<Response>
} => {
  const getUserProfileData = async (req: Request, res: Response): Promise<Response> => {
    if (req.params.userId === undefined) throw new BadRequestError('UserId not found')

    const userData = await getUserInfo(req.params.userId, params.userDbCalls)

    return res.status(200).send(JSON.parse(JSON.stringify(userData)))
  }

  return {
    getUserProfileData
  }
}
