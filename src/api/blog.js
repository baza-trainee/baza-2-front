import instanceBaza2 from './config/instance-baza2';
// Example Value Schema
// [
//   {
//     "title": {
//     "en": "Article",
//     "pl": "Article",
//     "ua": "Article"
//   },
//   "text": {
//     "en": "text",
//     "pl": "text",
//     "ua": "text"
//   },
//     "homeUrl": "https://example.com",
//     "imageUrl": "image.jpg"
//   }
// ]
const blogEndpoint = '/blog'

export async function  getAllArticles({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${blogEndpoint}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewArticle(newArticle){
	try {
		const res = await instanceBaza2.post(blogEndpoint, newArticle, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getArticleById(id){
	try {
		const res = await instanceBaza2.get(`${blogEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteArticleById(id){
	try {
		const res = await instanceBaza2.delete(`${blogEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateArticleById(id, updArticle){
	try {
		const res = await instanceBaza2.patch(`${blogEndpoint}/${id}`, updArticle, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}