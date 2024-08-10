'use client';

import styles from './AddProject.module.scss'
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewProject } from '@/src/api/projects';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'

import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';


export default function AddProject() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
 //'description' || 'team'
  const[ subpageName, setSubpageName ] = useState('description');

  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/projects')
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return createNewProject(data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Додати проєкт'} nav={true} hendleNav={setSubpageName}>
      <p>{subpageName}</p>
      {/* <ReviewForm hendleMutate={mutate} isSuccess={isSuccess}/> */}

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Проєкт успішно додано'} btn={true}></AdminModal>

      <UseAlert/>
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