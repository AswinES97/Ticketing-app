import { type kafkaParams } from '../../types/types'
import { type UserProfile } from '../../adapters/Interfaces/repositories/profile'
import { type IUserDoc, UserModel } from '../../frameworks/database/mongodb/model/user'

import { kafakEntities } from '../../entities/user'

export const kafkaUseCase = async (
  params: kafkaParams
): Promise<void> => {
  await params.kafaCalls.consume(
    params.kakfaMongDbCalls,
    params.consumerKeys,
    kafakEntities
  )
}

export const getUserInfo = async (userId: string, userDbCalls: UserProfile): Promise<IUserDoc | null> => {
  return await UserModel.findOne({ userId })
}
