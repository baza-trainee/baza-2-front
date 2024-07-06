import instance from './config/instance'

export async function  getAllProjects(search=''){
	try {
		const res = await instance.get(`/projects${`?search=${search}`}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

// Отримати посилання на фото або документи База2- 
//createImageUrl(1704803899277.png)

// Отримати посилання на фото або документи База1- 
// createImageUrlBaza1(1704803899277.png)

//Або так  BASE_URL/files/1704803899277.png 

