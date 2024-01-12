import 'dotenv/config'

const configKeys = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  MONGO_URL: process.env.MONGO_URL as string,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS as string,
  BASE_URL: process.env.BASE_URL as string,
  MAIL_URL: process.env.MAIL_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY as string
}

export default configKeys
