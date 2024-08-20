'use client';
import styles from './Members.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteMemberById, getAllMembers } from '@/src/api/members';
import SectionAdmin from '../SectionAdmin/SectionAdmin'
import { Icon } from '../../shared/Icon/Icon'
import MainButton from '../../shared/MainButton/MainButton'
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import MembersList from './MembersList/MembersList';

export default function Members() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const [ search, setSearch ] = useState('')
  const addMembePath = '/admin/members/add'
  // Запит на базу
  const { isError, data, refetch } = useQuery({ queryKey: ['members', search], 
    queryFn:()=>{return getAllMembers({search:search})}, keepPreviousData: true });
    
// Запит на видалення
  const deleteMember = useMutation({
    mutationFn:(id) => {
      return deleteMemberById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Учасники'} hendleSearch={setSearch} lang={true}>
      <div className={styles.wrapper}>
        <h2>Прізвище та Ім’я</h2>
        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
            router.push(addMembePath)
          }}>
            <Icon name={'plus_icon'} width={24} height={24} />
          {'Додати'}</MainButton >
      </div>

      {isError ?
        <>
          <p className={styles.error}>Помилка завантаження контенту.</p>
          <p className={styles.error}>Оновіть сторінку або спробуйте пізніше.</p>
        </>:
        <>
          {data && <MembersList data={data.results} hendleRemove={ deleteMember.mutate }/>}
        </>
      }

      { deleteMember.isPending && <Loader/> }

      <UseAlert/>
    </SectionAdmin>
  )
}