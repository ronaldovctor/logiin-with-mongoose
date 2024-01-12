import { useCallback, useState } from 'react'

const useFetch = () => {
	const [data, setData] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const request = useCallback(async (url: string, options: {}) => {
		let response
		let json
		try {
			setLoading(true)
			setError(null)
			response = await fetch(url, options)

			if (!response.ok) {
				const status = await response.json()
				throw new Error(status.message)
			}

			json = await response.json()
		} catch (error: any) {
			setLoading(false)
			setError(error.message)
			json = null
		} finally {
			setLoading(false)
			setData(json)
			return { response, json }
		}
	}, [])

	return {
		request,
		data,
		error,
		loading,
	}
}

export default useFetch
