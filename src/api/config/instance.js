import axios from 'axios'
//const baseURL = 'https://baza-trainee.tech/api/v1';
// baza-trainee 1
const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
})

export default instance