import instanceBaza2 from './config/instance-baza2';
// Example Value Schema post
// {
//   "title": "example",
//   "text": "Long text",
//   "date": 888888444440,
//   "file": "image file (JPG, PNG, WEBP)"
// }

// Example Value Schema get
//   {
//     "title": "example",
//     "text": "Long text",
//     "date": 1669872000000,
//     "imageUrl": "image.jpg"
//   }

const blogEndpoint = '/blog'

export async function  getAllBlogArticles({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instanceBaza2.get(`${blogEndpoint}?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  createNewBlogArticle(newArticle){
	try {
		const res = await instanceBaza2.post(blogEndpoint, newArticle, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  getBlogArticleById(id){
	try {
		const res = await instanceBaza2.get(`${blogEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  deleteBlogArticleById(id){
	try {
		const res = await instanceBaza2.delete(`${blogEndpoint}/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}

export async function  updateBlogArticleById(id, updArticle){
	try {
		const res = await instanceBaza2.patch(`${blogEndpoint}/${id}`, updArticle, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.message)
	}
}