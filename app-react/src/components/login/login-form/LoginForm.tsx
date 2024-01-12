import React, { FormEvent, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import useInput from '../../../hooks/useInput'
import Button from '../../button/Button'
import Input from '../../input/Input'
import styles from './LoginForm.module.scss'

function LoginForm() {
	const context = useContext(UserContext)
	const email = useInput('email')
	const password = useInput(null)

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		if (email.validate() && password.validate()) {
			context?.userLogin(email.value, password.value)
		}
	}

	return (
		<div className={styles.form}>
			<div className={`${styles.title} title`}>
				<h1>Sign In</h1>
			</div>
			<div>
				<p className={styles.subtitle}>
					Enter with your account. Or <NavLink to={'/create'}>Create One.</NavLink>
				</p>
			</div>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
				<Input label={'Email'} name={'email'} type={'email'} {...email} />
				<Input label={'Password'} name={'password'} type={'password'} {...password} />
				<Button>Sing in</Button>
			</form>
		</div>
	)
}

export default LoginForm
