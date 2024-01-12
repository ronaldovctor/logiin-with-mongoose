import { Router, Request, Response } from 'express'
import { User } from './models/User/User'
import { CREATE_USER_CONTROLLER } from './useCases/CreateUser/CreateUserController'
import { LOGIN_USER_CONTROLLER } from './useCases/LoginUser/LoginUserController'
import { CHECK_TOKEN } from './useCases/UserToken/UserTokenController'

const router = Router()

router.post('/token', async (request: Request, response: Response) => {
	await CHECK_TOKEN(request, response)
})

router.post('/create', async (request: Request, response: Response) => {
	await CREATE_USER_CONTROLLER(request, response)
})

router.post('/login', async (request: Request, response: Response) => {
	await LOGIN_USER_CONTROLLER(request, response)
})

export { router }
