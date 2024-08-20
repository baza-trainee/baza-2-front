'use client';
import styles from './Team.module.scss'
import { Icon } from '@/src/components/shared/Icon/Icon'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { useProjectFormContext } from '../ProjectFormProvider/ProjectFormProvider';
import TeamListList from './TeamList/TeamList';
import { useState } from 'react';
import MemberForm from '../../Members/MemberForm/MemberForm';
import TeamForm from './TeamForm/TeamForm';

export default function Team() {
  const{ 
    teamMemberData, 

   } = useProjectFormContext()
  const[ pageName, setPageName ] = useState('list')
  const data = [
    {
      teamMember: {
        id: "6471fa06933513f26024a990",
        name: {
          en: "John Doe",
          pl: "Jan Kowalski",
          ua: "Іван Петрович"
        },
        profileUrl: "https://www.linkedin.com/in/johndoe"
      },
      teamMemberRole: {
        _id: "6471f9a29c17ac2190eb8791",
        name: {
          en: "Developer",
          pl: "Programista",
          ua: "Розробник"
        }
      }
    }
  ]


  return (
    <>
      { pageName === 'list' &&  <>
          <div className={styles.wrapper}>
            <h2>Прізвище та Ім’я</h2>
            <p>Спеціалізація</p>
            <MainButton  variant='admin' className={styles.btn} onClick={()=>{
                setPageName('add_member')
              }}>
                <Icon name={'plus_icon'} width={24} height={24} />
              {'Додати'}</MainButton >
          </div>
          <TeamListList data={data}/>
        </>
      }  

      {pageName === 'add_member' && <TeamForm/>}
    </>
  )
}