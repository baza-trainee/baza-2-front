import instanceBaza2 from "./config/instance-baza2";

const rolesEndpoint = '/roles';
// {
//   "name": {
//     "en": "Developer",
//     "pl": "Programista",
//     "ua": "Розробник"
//   }
// }

export async function getAllRoles({ page, search, limit }) {
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

  const res = await instanceBaza2.get(`${rolesEndpoint}?${params.toString()}`)
  return res.data
}

export async function createNewRole(role) {
  const res = await instanceBaza2.post(rolesEndpoint, role);
  return res
}

export async function getRoleById(id) {
  const res =  await instanceBaza2.get(`${rolesEndpoint}/${id}`);
  return res.data
}

export async function deleteRoleById(id) {
  const res = await instanceBaza2.delete(`${rolesEndpoint}/${id}`);
  return res
}

export async function updateRoleById(id, role) {
  const res = await instanceBaza2.patch(`${rolesEndpoint}/${id}`, role);
  return res
}
