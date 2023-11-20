import { kafakEntities } from '../../entities/user'
import { type kafkaParams } from '../../types/types'

export const kafkaUseCase = async (
  params: kafkaParams
): Promise<void> => {
  await params.kafaCalls.consume(
    params.kakfaMongDbCalls,
    params.consumerKeys,
    kafakEntities
  )
}
