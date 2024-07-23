//import { bazaAPI } from './config';

import instanceBaza2 from "./config/instance-baza2";

// import { TMemberRoleReq, TMemberRoleResp } from '@/types/projectsTypes';
// import { TResponseRoles } from '@/types/typesAPI';

const rolesEndpoint = '/roles';


export async function getAllRoles() {
  const res = await instanceBaza2.get()
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
