'use client';
import switchTabProject from '@/src/state/switchTabProject';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import Description from '../Description/Description'

export default function AddProjectLayout() {
  const tabName = switchTabProject(state => state.tabName);

 return( 
    <SectionAdmin title={'Додати проєкт'} nav={true}>
      {tabName=='description'&& <Description/>}
      {tabName=='team'&& <p>team</p>}
    </SectionAdmin>
  )
}

// {
//   "title": {
//     "en": "Project A",
//     "pl": "Projekt A",
//     "ua": "Проект A"
//   },
//   "file": "($binary)",
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