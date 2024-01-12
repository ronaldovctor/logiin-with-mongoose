import React, { ReactNode, ReactPropTypes } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
	children: ReactNode
	[x: string]: any
}

function Button({ children, ...props }: ButtonProps): JSX.Element {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	)
}

export default Button
