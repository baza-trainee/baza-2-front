import axios from 'axios'
const BASE_URL = 'https://baza-trainee-landing.vercel.app/api/v1'
const instance = axios.create({
	//baseURL: process.env.PUBLIC_API_URL,
	baseURL:BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

// instance.interceptors.request.use(config => {
// 	config.withCredentials = true
// 	return config
// })

export default instance