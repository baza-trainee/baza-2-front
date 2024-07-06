import instanceBaza2 from './config/instance-baza2';
// Example Value Schema

const reviews = '/reviews'

export async function  getAllReviews({ page, query, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (query) params.append('query', query);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${reviews}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewReview(newReview){
	try {
		const res = await instanceBaza2.post(reviews, newReview, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getReviewById(id){
	try {
		const res = await instanceBaza2.get(`${reviews}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteReviewById(id){
	try {
		const res = await instanceBaza2.delete(`${reviews}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateReviewById(id, updReview){
	try {
		const res = await instanceBaza2.patch(`${reviews}/${id}`, updReview, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}