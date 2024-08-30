import instanceBaza2 from "./config/instance-baza2";

// Schema Response body
// {
//   "projects": 44,
//   "members": 392,
//   "employed": 92
// }
const achievementsEndpoint = '/achievements'

export async function getData(){
	const res = await instanceBaza2.get(achievementsEndpoint)
		return res.data
}

// Schema
// {
//   "employed": 5
// }
export async function updateEmployed(employed){
	const res = await instanceBaza2.patch(achievementsEndpoint, employed)
		return res
}

export async function getEmployed(){
	const res = await instanceBaza2.get(`${achievementsEndpoint}/employed`);
		return res.data
}