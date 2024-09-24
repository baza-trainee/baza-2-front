import axios from 'axios'
//const baseURL = 'https://baza-crm.mooo.com/api/v1';
// baza-crm

const instanceBazaCrm = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_CRM_URL,
	 headers: {
		'Content-Type': 'application/json',
	},
})

export default instanceBazaCrm