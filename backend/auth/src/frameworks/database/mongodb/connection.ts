import mongoose from 'mongoose'
import configKeys from '../../../config/config'

export const mongoConnect = async (): Promise<void> => {
  try {
    const MONGO_URL = configKeys.MONGO_URL

    await mongoose.connect(MONGO_URL)
    console.log('mongodb Connected')
  } catch (error) {
    console.log('mongodb connection error')
  }
}
