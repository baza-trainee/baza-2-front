import instanceBaza2 from "./config/instance-baza2";

// Schema Response body
// {
//   "projects": 44,
//   "members": 392,
//   "employed": 92
// }
const achievementsEndpoint = '/achievements'

export async function getData(){
	try {
		const res = await instanceBaza2.get(achievementsEndpoint)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

// Schema
// {
//   "employed": 5
// }
export async function updateEmployed(employed){
	try {
		const res = await instanceBaza2.patch(achievementsEndpoint, employed)
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function getEmployed(){
	try {
		const res = await instanceBaza2.get(`${achievementsEndpoint}/employed`);
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}