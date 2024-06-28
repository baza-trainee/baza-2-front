import instance from './instance'

export async function  getAllProjects(search=''){
	try {
		const res = await instance.get(`/projects${`?search=${search}`}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
//'https://baza-trainee.tech/api/v1/projects?search=value'