import instanceBaza2 from './config/instance-baza2';
// Example Value Schema
// [
//   {
//     "name": "example",
//     "homeUrl": "https://example.com",
//     "imageUrl": "image.jpg"
//   }
// ]
export async function  getAllPartners({ page, query, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (query) params.append('query', query);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`/partners?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewPartner(newPartner){
	try {
		const res = await instanceBaza2.post(`/partners`, newPartner, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getPartnerById(id){
	try {
		const res = await instanceBaza2.get(`/partners/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deletePartnerById(id){
	try {
		const res = await instanceBaza2.delete(`/partners/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updatePartnerById(id, updPartner){
	try {
		const res = await instanceBaza2.patch(`/partners/${id}`, updPartner, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}