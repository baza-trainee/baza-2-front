import instance from './config/instance'

export async function  getAllPartners(){
	try {
		const res = await instance.get('/partners')
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}