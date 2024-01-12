import { Request, Response } from 'express'
import { User } from '../../models/User/User'
import jwt from 'jsonwebtoken'
import { consts } from '../../utils/Consts'
import bcrypt from 'bcryptjs'

const LOGIN_USER_CONTROLLER = async (
	request: Request,
	response: Response
): Promise<void> => {
	const { email, password } = request.body
	User.findOne({ email })
		.lean()
		.exec((err, user) => {
			if (err)
				response.status(500).send({
					error: err,
					message: 'Server error.',
				})

			const check_user: boolean = password == '' || password == null || !user
			if (!check_user) {
				if (bcrypt.compareSync(password, user!.password!)) {
					const token: string = jwt.sign({ _id: user!._id }, consts.keyJWT, {
						expiresIn: consts.expiresJWT,
					})
					delete user!.password
					return response.json({
						...user,
						token,
					})
				}
			}
			return response.status(500).json({
				message: 'Wrong e-mail or password.',
			})
		})
}

export { LOGIN_USER_CONTROLLER }
