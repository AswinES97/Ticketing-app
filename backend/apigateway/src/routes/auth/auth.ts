import { Router } from 'express'
import authUserRouter from './auth.user'
import tokenRouter from './token'

const authRouter = Router()

authRouter.use('/user', authUserRouter)
authRouter.use('/token', tokenRouter)

export default authRouter
