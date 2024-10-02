import axios from 'axios'

const instanceBaza2 = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API2_URL,
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