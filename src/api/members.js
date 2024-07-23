//import instance from './config/instance';
// Example Value Schema
// {
//   "results": [
//     {
//       "name": {
//         "en": "John Doe",
//         "pl": "Jan Kowalski",
//         "ua": "Іван Петрович"
//       },
//       "profileUrl": "https://www.linkedin.com/in/johndoe"
//     }
//   ],
//   "pagination": {
//     "currentPage": 0,
//     "totalPages": 0,
//     "totalResults": 0
//   }

import instanceBaza2 from "./config/instance-baza2";

// }
export async function  getAllMembers({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`/members?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
// Example Value Schema
// {
//   "name": {
//     "en": "John Doe",
//     "pl": "Jan Kowalski",
//     "ua": "Іван Петрович"
//   },
//   "profileUrl": "https://www.linkedin.com/in/johndoe"
// }
export async function  createNewMember(newMember){
	try {
		const res = await instanceBaza2.post(`/members`, newMember, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getMemberById(id){
	try {
		const res = await instanceBaza2.get(`/members/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteMemberById(id){
	try {
		const res = await instanceBaza2.delete(`/members/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateMemberById(id, updMember){
	try {
		const res = await instanceBaza2.patch(`/members/${id}`, updMember, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
