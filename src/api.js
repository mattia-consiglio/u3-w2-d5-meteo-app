const api = async (type, endpoint, query = {}) => {
	const types = [
		'https://api.openweathermap.org/data/2.5/',
		'http://api.openweathermap.org/geo/1.0/',
	]
	const key = process.env.API_KEY
	const endpoints = type === 0 ? ['weather', 'forecast', 'forecast/daily'] : ['direct', 'reverse']

	if (type === 0) {
		query.lang = 'it'
		query.units = 'metric'
	}

	query.appid = key

	return fetch(types[type] + endpoints[endpoint] + '?' + new URLSearchParams(query))
		.then(response => {
			if (!response.ok) {
				throw Error(response.statusText)
			}
			return response
		})
		.then(response => response.json())
		.then(data => ({ status: 'success', data }))
		.catch(error => {
			return { status: 'error', data: error }
		})
}

export default api
