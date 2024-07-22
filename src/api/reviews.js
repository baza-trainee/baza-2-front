import instanceBaza2 from './config/instance-baza2';
// Example Value Schema

const reviewsEndpoint = '/reviews'

export async function  getAllReviews({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${reviewsEndpoint}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewReview(newReview){
	try {
		const res = await instanceBaza2.post(reviewsEndpoint, newReview, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getReviewById(id){
	try {
		const res = await instanceBaza2.get(`${reviewsEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteReviewById(id){
	try {
		const res = await instanceBaza2.delete(`${reviewsEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateReviewById(id, updReview){
	try {
		const res = await instanceBaza2.patch(`${reviewsEndpoint}/${id}`, updReview, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}