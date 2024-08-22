import instanceBaza2 from './config/instance-baza2';
// Example Value Schema post
//   {
//     "title": "example",
//     "description": "Long text",
//     "link": "https://example.com",
//     "date": 1669872000000,
//     "file": "image file (JPG, PNG, WEBP)"
//   }

// Example Value Schema get
//   {
//     "title": "example",
//     "description": "Long text",
//     "link": "https://example.com",
//     "date": 1669872000000,
//     "imageUrl": "image.jpg"
//   }
const articlesEndpoint = '/articles'

export async function  getAllArticles({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${articlesEndpoint}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  createNewArticle(newArticle){
	try {
		const res = await instanceBaza2.post(articlesEndpoint, newArticle, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  getArticleById(id){
	try {
		const res = await instanceBaza2.get(`${articlesEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  deleteArticleById(id){
	try {
		const res = await instanceBaza2.delete(`${articlesEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  updateArticleById(id, updArticle){
	try {
		const res = await instanceBaza2.patch(`${articlesEndpoint}/${id}`, updArticle, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}