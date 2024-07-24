import axios from 'axios'
import { BASE_URL2 } from '@/src/constants/constants'

const instanceBaza2 = axios.create({
	// baseURL: process.env.api,
	baseURL:BASE_URL2,
	 headers: {
		'Content-Type': 'application/json',
	},
})

export default instanceBaza2