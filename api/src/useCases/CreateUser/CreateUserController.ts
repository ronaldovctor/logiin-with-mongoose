import { Request, Response } from 'express'
import { User } from '../../models/User/User'
import bcrypt from 'bcryptjs'
import { consts } from '../../utils/Consts'

const CREATE_USER_CONTROLLER = async (
	request: Request,
	response: Response
): Promise<void> => {
	try {
		const { name, email, password } = request.body
		const alreadyExists = await User.findOne({ email }).exec()

		if (!alreadyExists) {
			const user = new User({ name, email, password })
			user.password = bcrypt.hashSync(password, consts.bcryptSalts)
			user.markModified('users')
			user.save((err, usr) => {
				delete user.password
				if (err)
					response
						.status(500)
						.send({ error: err, message: 'Error while savinh the user.' })
				else response.status(201).send(usr)
			})
		} else {
			response.status(500).send({
				message: 'Wrong e-mail or password.',
			})
		}
	} catch (error) {
		response.status(500).send({
			error: error,
			message: 'Error while creating the user.',
		})
	}
}

export { CREATE_USER_CONTROLLER }
