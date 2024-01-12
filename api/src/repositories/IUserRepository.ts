import { IUser } from '../models/User/IUser'

export interface IUserRespository {
	createUser(user: IUser): Promise<void>
}
