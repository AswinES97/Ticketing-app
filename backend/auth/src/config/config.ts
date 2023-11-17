import 'dotenv/config'

const configKeys = {
  PORT: process.env.PORT ?? 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  MONGO_URL: process.env.MONGO_URL ?? 'mongodb://localhost:27017/auth',
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS as string,
  BASE_URL: process.env.BASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY as string
}

export default configKeys
