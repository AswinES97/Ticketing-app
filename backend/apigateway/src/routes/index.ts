import { Router } from 'express'

import authRouter from './auth/auth'
import profileRouter from './profile/profile'
import { authentication } from '../middlewares/authentication'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/profile', authentication, profileRouter)

export default mainRouter
