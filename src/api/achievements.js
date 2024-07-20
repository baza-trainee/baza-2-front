import instanceBaza2 from "./config/instance-baza2";

// Schema Response body
// {
//   "projects": 44,
//   "members": 392,
//   "employed": 92
// }
const achievements = '/achievements'

export async function getData(){
	try {
		const res = await instanceBaza2.get(achievements)
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
		const res = await instanceBaza2.patch(achievements, employed)
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function getEmployed(){
	try {
		const res = await instanceBaza2.get(`${achievements}/employed`);
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}