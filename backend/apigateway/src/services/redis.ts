import { createClient } from 'redis'

export const connectRedis = async (): Promise<any> => {
  return await createClient()
    .on('error', (err) => {
      console.log('Redis Client Error', err)
    })
    .connect()
}
