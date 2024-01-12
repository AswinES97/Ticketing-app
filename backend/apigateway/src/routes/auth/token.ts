import { Router } from 'express'
import { refreshTokenController } from '../../controller/token/refreshToken'

const tokenRouter = Router()

tokenRouter.get('/refreshAuthToken', refreshTokenController)

export default tokenRouter
