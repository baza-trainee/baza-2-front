import axios from 'axios'
import { BASE_URL2 } from '@/src/constants/constants'
//import { BASE_URL } from '@/src/constants/constants'
//const BASE_URL2 = 'https://baza2.crabdance.com/api/v1';
// baza-2


const instanceBaza2 = axios.create({
	// baseURL: process.env.api,
	baseURL:BASE_URL2,
	 headers: {
		'Content-Type': 'application/json',
	},
	//withCredentials: true,
})
// instanceBaza2.interceptors.request.use((config) => {
//   const token = window.sessionStorage.getItem('access_token');
//   config.headers.Authorization = `${token}`;
//   return config;
// });


export default instanceBaza2


// fetch('https://baza2.crabdance.com/api/v1/auth/user')
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })

// fetch('https://baza2.crabdance.com/api/v1/auth/login', {
//     method: "POST",
//     body: JSON.stringify({"email": "user@example.com",
//   "password": "password123"}),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     return response.json();
//   }).then((data) => {
//     console.log(data);
//   })

