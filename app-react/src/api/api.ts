export const API_URL = 'http://localhost:5000'

export const CHECK_TOKEN = (token: string) => {
	return {
		url: `${API_URL}/token`,
		options: {
			method: 'POST',
			headers: {
				Authorization: token,
			},
		},
	}
}

export const LOGIN_USER = (body: {}) => {
	return {
		url: `${API_URL}/login`,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		},
	}
}

export const LOGIN_CREATE = (body: {}) => {
	return {
		url: `${API_URL}/create`,
		options: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		},
	}
}
