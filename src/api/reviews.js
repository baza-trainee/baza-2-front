import instanceBaza2 from './config/instance-baza2';

const reviewsEndpoint = '/testimonials'

export async function  getAllReviews(){
	const res = await instanceBaza2.get(reviewsEndpoint)
		return res.data
}

export async function  createNewReview(newReview){
	const res = await instanceBaza2.post(reviewsEndpoint, newReview, {
		headers: { 'Content-Type': 'multipart/form-data' }})
		return res
}

export async function  getReviewById(id){
	const res = await instanceBaza2.get(`${reviewsEndpoint}/${id}`)
		return res.data
}

export async function  deleteReviewById(id){
	const res = await instanceBaza2.delete(`${reviewsEndpoint}/${id}`)
		return res.data
}

export async function  updateReviewById(id, updReview){
	const res = await instanceBaza2.patch(`${reviewsEndpoint}/${id}`, updReview, {
		headers: { 'Content-Type': 'multipart/form-data' },
  })
	return res.data
}