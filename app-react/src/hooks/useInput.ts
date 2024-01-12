import React, { ReactPropTypes, useState } from 'react'
import PropTypes from 'prop-types'

const types = {
	email: {
		regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
		message: 'Preencha um email válido.',
	},
	password: {
		regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
		message: 'Mínimo 8 caracteres (1 maiúsculo, minúsculo, digito e 1 especial).',
	},
	name: {
		regex: /(.*[a-z]){3}/i,
		message: 'Preencha um nome válido. (Pelo menos 3 letras)',
	},
}

function useInput(type: keyof typeof types | null) {
	const [value, setValue] = useState('')
	const [error, setError] = useState<null | string>(null)

	function validate(value: string) {
		if (type == null) return true
		if (!value.length) {
			setError('Preencha o campo.')
			return false
		}
		if (!types[type!].regex.test(value)) {
			setError(types[type!].message)
			return false
		} else {
			setError(null)
			return true
		}
	}

	function onChange({ target }: { [x: string]: HTMLInputElement }) {
		setValue(target.value)
		if (error) validate(value)
	}

	return {
		value,
		onChange,
		onBlur: () => validate(value),
		validate: () => validate(value),
		error,
	}
}

useInput.propTypes = {}

export default useInput
