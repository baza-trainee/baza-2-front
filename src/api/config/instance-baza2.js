import axios from 'axios'
import { BASE_URL2 } from '@/src/constants/constants'

//const BASE_URL2 = 'https://baza2.crabdance.com/api/v1';
// baza-2
const instanceBaza2 = axios.create({
	// baseURL: process.env.api,
	baseURL:BASE_URL2,
	 headers: {
		'Content-Type': 'application/json',
	},
	//withCredentials: true,
	// origin: "http://localhost:3000"
	//headers: { Cookie: cookies().toString() },

})

export default instanceBaza2