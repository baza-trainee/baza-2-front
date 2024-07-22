import instanceBaza2 from "./config/instance-baza2";

const documentsEndpoint = '/documents'

export async function getDocuments(){
	try {
		const res = await instanceBaza2.get(documentsEndpoint)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}