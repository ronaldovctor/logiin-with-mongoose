import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../api/api'

type UserContextProps = {
	userLogin: (email: string, password: string) => Promise<void>
	error: string | null | undefined
	loading: boolean | undefined
	login: boolean | undefined
	data: DataProp | undefined | null
	logout: () => void
}

type DataProp = {
	name?: string
	email?: string
	token?: string
}

export const UserContext = createContext<UserContextProps | null>(null)

type UserStorageProps = {
	children: ReactNode
}

export function UserStogare({ children }: UserStorageProps) {
	const [data, setData] = useState<DataProp | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [login, setLogin] = useState<boolean>(false)
	const navigate = useNavigate()

	const userLogin = useCallback(
		async (email: string, password: string) => {
			let json
			let response
			try {
				setLoading(true)
				const { url, options } = LOGIN_USER({ email, password })
				response = await fetch(url, options)
				if (!response.ok) {
					const status = await response.json()
					throw new Error(status.message)
				}
				json = await response.json()
				window.localStorage.setItem('token', json.token)
				delete json.token
				navigate('/account')
				setLogin(true)
			} catch (error) {
				json = null
				setError((error as ErrorEvent).message)
			} finally {
				setData(json)
				setLoading(false)
			}
		},
		[navigate]
	)

	const logout = useCallback(() => {
		setData(null)
		setError(null)
		setLoading(false)
		setLogin(false)
		navigate('/')
		window.localStorage.removeItem('token')
	}, [navigate])

	return (
		<>
			<UserContext.Provider value={{ userLogin, error, login, loading, data, logout }}>
				{children}
			</UserContext.Provider>
		</>
	)
}

export default UserContext
