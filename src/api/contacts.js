import instanceBaza2 from "./config/instance-baza2";

export async function getContacts(){
	try {
		const res = await instanceBaza2.get('/contacts')
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}