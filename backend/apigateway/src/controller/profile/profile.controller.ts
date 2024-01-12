// import axios from 'axios'
import { type Request, type Response } from 'express'
import { type IJwtHsaSub } from '../../types/types'
import { configKeys } from '../../config/configKeys'
import axios from 'axios'

export const getUserProfileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body.user as IJwtHsaSub
  const response = await axios.get(
    `${configKeys.PROFILE_SRV}/user/${userData.userId}`
  )
  res.status(response.status).send(response.data)
}

export const updateUsernameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body.user as IJwtHsaSub
  const response = await axios.patch(
    `${configKeys.PROFILE_SRV}/user/username/${userData.userId}`, { username: req.body.username }
  )
  res.status(response.status).send(response.data)
}
