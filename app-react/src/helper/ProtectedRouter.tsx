import React, { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

type ProtectedRouterProps = {
	children: ReactNode
}

function ProtectedRouter({ children }: ProtectedRouterProps): any {
	const context = useContext(UserContext)

	return context?.login ? <Navigate to='/account' /> : children
}

export default ProtectedRouter
