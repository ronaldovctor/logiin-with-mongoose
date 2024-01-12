import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginForm from './login-form/LoginForm'
import LoginCreate from './login-create/LoginCreate'
import styles from './Login.module.scss'
import { ReactComponent as Google } from './../../assets/google_logo.svg'
import { ReactComponent as Apple } from './../../assets/apple_logo.svg'
import Tree from './../../assets/tree.png'
import User from '../user/User'
import ProtectedRouter from '../../helper/ProtectedRouter'

function Login() {
	const location = useLocation()
	const account: boolean = location.pathname == '/account'

	return (
		<div className={`${styles.login} ${account && styles.account}`}>
			<div className={`${styles.form} animeLeft`}>
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRouter>
								<LoginForm />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/create'
						element={
							<ProtectedRouter>
								<LoginCreate />
							</ProtectedRouter>
						}
					/>
					<Route
						path='/account'
						element={
							<ProtectedRouter>
								<User />
							</ProtectedRouter>
						}
					/>
				</Routes>
				{!account && (
					<div className={styles.externalLogin}>
						<div className={styles.text}>
							<p>Or Sign {location.pathname == '/create' ? 'In' : 'Up'} with</p>
						</div>
						<div className={styles.imgs}>
							<Google />
							<div className='separator'></div>
							<Apple />
						</div>
					</div>
				)}
			</div>

			<div className={styles.logoBox}>
				<div className={styles.logo}>
					<img src={Tree} alt='logo' />
				</div>
			</div>
		</div>
	)
}

export default Login
