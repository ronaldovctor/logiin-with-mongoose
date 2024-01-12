import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { consts } from '../../utils/Consts'

const CHECK_TOKEN = async (request: Request, response: Response) => {
	const token = request.get('Authorization')
	if (!token)
		response.status(401).json({
			message: 'Access denied.',
		})
	jwt.verify(token, consts.keyJWT, (err, decoded) => {
		if (err || !decoded)
			return response.status(401).json({
				message: 'Authentication error!',
				error: err,
			})
		else return response.status(200).send({})
	})
}

export { CHECK_TOKEN }
