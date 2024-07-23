import instanceBaza2 from './config/instance-baza2';
// Example Value Schema
// [
//   {
//     "name": "example",
//     "homeUrl": "https://example.com",
//     "imageUrl": "image.jpg"
//   }
// ]
const partnersEndpoint = '/partners'

export async function  getAllPartners({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${partnersEndpoint}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewPartner(newPartner){
	try {
		const res = await instanceBaza2.post(partnersEndpoint, newPartner, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getPartnerById(id){
	try {
		const res = await instanceBaza2.get(`${partnersEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deletePartnerById(id){
	try {
		const res = await instanceBaza2.delete(`${partnersEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updatePartnerById(id, updPartner){
	try {
		const res = await instanceBaza2.patch(`${partnersEndpoint}/${id}`, updPartner, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}