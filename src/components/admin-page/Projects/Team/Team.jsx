'use client';
import styles from './Team.module.scss'
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/src/api/roles';
import { Icon } from '@/src/components/shared/Icon/Icon'
import MainButton from '@/src/components/shared/MainButton/MainButton'
import { useProjectFormContext } from '../ProjectFormProvider/ProjectFormProvider';
import TeamListList from './TeamList/TeamList';
import { useCallback, useState } from 'react';
import AddTeamMember from './AddTeamMember/AddTeamMember';


export default function Team() {
  // Контекст форми
  const{ 
    teamMemberData, 
    deleteMember,
   } = useProjectFormContext()

  const[ pageName, setPageName ] = useState('list')

  // Отримуємо всі спеціальності
  const getRoles = useQuery({ queryKey: ['roles'], 
    queryFn:()=>{return getAllRoles({})}, keepPreviousData: true });


  const hendleCancel = useCallback(()=>{
    setPageName('list')
  })

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

          <TeamListList data={teamMemberData} hendleRemove={deleteMember} roles={getRoles.data?.results}/>
        </>
      }  

      {pageName === 'add_member' && <AddTeamMember hendleCancel={hendleCancel} roles={getRoles.data?.results}/>}
    </>
  )
}