import instanceBaza2 from './config/instance-baza2';

const projectsEndpoint = '/projects'

export async function  getAllProjects({ page, search, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (search) params.append('search', search);
	if (limit) params.append('limit', limit.toString());

	const res = await instanceBaza2.get(`${projectsEndpoint}?${params.toString()}`)
		return res.data
}

export async function  createNewProject(newProject){
	const res = await instanceBaza2.post(projectsEndpoint, newProject, {
		headers: { 'Content-Type': 'multipart/form-data' }})
		return res
}

export async function  getProjectById(id){
	const res = await instanceBaza2.get(`${projectsEndpoint}/${id}`)
		return res.data
}

export async function  deleteProjectById(id){
	const res = await instanceBaza2.delete(`${projectsEndpoint}/${id}`)
		return res
}

export async function  updateProjectById(id, updProject){
	const res = await instanceBaza2.put(`${projectsEndpoint}/${id}`, updProject, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
}

// Example Value Schema
// {
//   "results": [
//     {
//       "title": {
//         "en": "Project A",
//         "pl": "Projekt A",
//         "ua": "Проект A"
//       },
//       "imageUrl": "image.jpg",
//       "deployUrl": "https://example.com/deploy",
//       "isTeamRequired": true,
//       "creationDate": 1669872000000,
//       "launchDate": 1669872000000,
//       "complexity": 1,
//       "teamMembers": [
//         {
//           "teamMember": {
//             "_id": "6471fa06933513f26024a990",
//             "name": {
//               "en": "John Doe",
//               "pl": "Jan Kowalski",
//               "ua": "Іван Петрович"
//             },
//             "profileUrl": "https://www.linkedin.com/in/johndoe"
//           },
//           "teamMemberRole": {
//             "_id": "6471f9a29c17ac2190eb8791",
//             "name": {
//               "en": "Developer",
//               "pl": "Programista",
//               "ua": "Розробник"
//             }
//           }
//         }
//       ]
//     }
//   ],
//   "pagination": {
//     "currentPage": 0,
//     "totalPages": 0,
//     "totalResults": 0
//   }
// }

// Example Value Schema
// {
//   "title": {
//     "en": "Project A",
//     "pl": "Projekt A",
//     "ua": "Проект A"
//   },
//   "imageUrl": "image.jpg",
//   "deployUrl": "https://example.com/deploy",
//   "isTeamRequired": true,
//   "creationDate": 1669872000000,
//   "launchDate": 1669872000000,
//   "complexity": 1,
//   "teamMembers": [
//     {
//       "teamMember": {
//         "_id": "6471fa06933513f26024a990",
//         "name": {
//           "en": "John Doe",
//           "pl": "Jan Kowalski",
//           "ua": "Іван Петрович"
//         },
//         "profileUrl": "https://www.linkedin.com/in/johndoe"
//       },
//       "teamMemberRole": {
//         "_id": "6471f9a29c17ac2190eb8791",
//         "name": {
//           "en": "Developer",
//           "pl": "Programista",
//           "ua": "Розробник"
//         }
//       }
//     }
//   ]
// }