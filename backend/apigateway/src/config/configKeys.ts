import dotenv from 'dotenv'
dotenv.config()

export const configKeys = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS as string,
  MAIL_URL: process.env.MAIL_URL as string,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY as string,
  AUTH_SRV: process.env.AUTH_SRV as string,
  PROFILE_SRV: process.env.PROFILE_SRV as string
}
