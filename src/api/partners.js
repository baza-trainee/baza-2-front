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

export async function  getAllPartners({ page, query, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (query) params.append('query', query);
	if (limit) params.append('limit', limit.toString());

	const res = await instanceBaza2.get(`${partnersEndpoint}?${params.toString()}`)
		return res.data
}

export async function  createNewPartner(newPartner){
	const res = await instanceBaza2.post(partnersEndpoint, newPartner, {
		headers: { 'Content-Type': 'multipart/form-data' }})
		return res
}

export async function  getPartnerById(id){
	const res = await instanceBaza2.get(`${partnersEndpoint}/${id}`)
		return res.data
}

export async function  deletePartnerById(id){
	const res = await instanceBaza2.delete(`${partnersEndpoint}/${id}`)
		return res
}

export async function  updatePartnerById(id, updPartner){
	const res = await instanceBaza2.patch(`${partnersEndpoint}/${id}`, updPartner, {
		headers: { 'Content-Type': 'multipart/form-data' },
  })
		return res.data
}