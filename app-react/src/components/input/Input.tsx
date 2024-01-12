import React, { ReactNode, ReactPropTypes } from 'react'
import styles from './Input.module.scss'

type InputProps = {
	name: string
	type: string
	[x: string]: any
}

function Input({ label, name, type, value, error, onChange, onBlur }: InputProps) {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<input
				id={name}
				className={`${styles.input} ${error && styles.invalid}`}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			<span className={styles.error}>{error}</span>
		</div>
	)
}

export default Input
