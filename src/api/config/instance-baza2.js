import axios from 'axios'

const BASE_URL2 = 'https://baza2.crabdance.com/api/v1';

const instanceBaza2 = axios.create({
	// baseURL: process.env.api,
	baseURL:BASE_URL2,
	headers: {
		'Content-Type': 'application/json'
	}
})

export default instanceBaza2