import axios from 'axios'
import { BASE_URL2 } from '@/src/constants/constants'

const instanceBaza2 = axios.create({
	// baseURL: process.env.api,
	baseURL:BASE_URL2,
	 headers: {
		'Content-Type': 'application/json',
	},
})

instanceBaza2.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('access_token');
	if(token){
		config.headers.Authorization = `Bearer ${token}`;
	}else config.headers.Authorization = '';
 
  return config;
});

export default instanceBaza2