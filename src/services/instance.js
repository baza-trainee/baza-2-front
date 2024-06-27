import axios from 'axios'

const instance = axios.create({
	baseURL: process.env.api,
	headers: {
		'Content-Type': 'application/json'
	}
})

// instance.interceptors.request.use(config => {
// 	config.withCredentials = true
// 	return config
// })

export default instance
