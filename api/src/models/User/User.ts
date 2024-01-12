import mongoose, { Schema, model } from 'mongoose'
import { IUser } from './IUser'

const UserSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
})

const User = mongoose.model<IUser>('User', UserSchema)

export { User }
