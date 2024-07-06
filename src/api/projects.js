import instance from './config/instance';

export async function  getAllProjects({ page, query, limit }){
	const params = new URLSearchParams();
	if (page) params.append('page', page.toString());
	if (query) params.append('query', query);
	if (limit) params.append('limit', limit.toString());

	try {
		const res = await instance.get(`/projects?${params.toString()}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  createNewProject(newProject){
	try {
		const res = await instance.post(`/projects`, newProject, {
			headers: { 'Content-Type': 'multipart/form-data' }})
		return res
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  getProjectById(id){
	try {
		const res = await instance.get(`/projects/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  deleteProjectById(id){
	try {
		const res = await instance.delete(`/projects/${id}`)
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export async function  updateProjectById(id, updProject){
	try {
		const res = await instance.patch(`/projects/${id}`, updProject, {
		  headers: { 'Content-Type': 'multipart/form-data' },
     })
		return res.data
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
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