import React, { FormEvent, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LOGIN_CREATE } from '../../../api/api'
import UserContext from '../../../context/UserContext'
import useFetch from '../../../hooks/useFetch'
import useInput from '../../../hooks/useInput'
import Button from '../../button/Button'
import Input from '../../input/Input'
import styles from './LoginCreate.module.scss'

function LoginCreate(): JSX.Element {
	const context = useContext(UserContext)
	const name = useInput('name')
	const email = useInput('email')
	const password = useInput(null)
	const { request } = useFetch()

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()
		if (name.validate() && email.validate() && password.validate()) {
			const { url, options } = LOGIN_CREATE({
				name: name.value,
				email: email.value,
				password: password.value,
			})

			const { response } = await request(url, options)

			if (response!.ok) context?.userLogin(email.value, password.value)
		}
	}

	return (
		<div className={styles.form}>
			<div className={`title ${styles.title}`}>
				<h1>Get Started</h1>
			</div>
			<div className={styles.subtitle}>
				<p>
					Already have an Account? <NavLink to={'/'}>Log In.</NavLink>
				</p>
			</div>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexFlow: 'column' }}>
				<Input label={'Name'} name={'name'} type={'text'} {...name} />
				<Input label={'Email'} name={'email'} type={'email'} {...email} />
				<Input label={'Password'} name={'password'} type={'password'} {...password} />
				{context?.loading && context?.loading ? (
					<Button disabled>Loading...</Button>
				) : (
					<Button>Sign up</Button>
				)}
			</form>
		</div>
	)
}

export default LoginCreate
