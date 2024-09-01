import instanceBaza2 from "./config/instance-baza2";

const membersEndpoint = '/members'

export async function  getAllMembers({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	const res = await instanceBaza2.get(`${membersEndpoint}?${params.toString()}`)
		return res.data
}

export async function  createNewMember(newMember){
	const res = await instanceBaza2.post(membersEndpoint, newMember)
		return res
}

export async function  getMemberById(id){
	const res = await instanceBaza2.get(`${membersEndpoint}/${id}`)
		return res.data
}

export async function  deleteMemberById(id){
	const res = await instanceBaza2.delete(`${membersEndpoint}/${id}`)
		return res.data
}

export async function  updateMemberById(id, updMember){
	const res = await instanceBaza2.patch(`${membersEndpoint}/${id}`, updMember)
		return res.data
}
