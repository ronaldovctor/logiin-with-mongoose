import React, { useContext } from 'react'
import styles from './User.module.scss'
import UserContext from '../../context/UserContext'
import { Navigate } from 'react-router-dom'

function User() {
	const context = useContext(UserContext)

	function handleClick(): void {
		context?.logout()
	}

	return context?.login ? (
		<div className={styles.user}>
			<div className={styles.title}>
				<h1>Welcome, {context?.data?.name}</h1>
			</div>
			<div className={styles.subtitle}>
				<p>{context?.data?.email}</p>
			</div>
			<button onClick={handleClick}>Logout</button>
		</div>
	) : (
		<Navigate to='/' />
	)
}

export default User
