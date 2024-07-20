import instanceBaza2 from "./config/instance-baza2";

const documents = '/documents'

export async function getDocuments(){
	try {
		const res = await instanceBaza2.get(documents)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}