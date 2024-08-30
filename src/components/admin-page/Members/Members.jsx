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
import MessageErrorLoading from '../../shared/MessageErrorLoading/MessageErrorLoading';

export default function Members() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);

  const [ params, setParams] = useState({
    search:'',
    page:1
  })

  const hendleSetSearch = (value='') => {
    setParams({page:1, search:value})
  }

  const hendleSetPage = (value) => {
    setParams({...params, page:value})
  }


  const addMembePath = '/admin/members/add'
  // Запит на базу
  const { isError, data, refetch } = useQuery({ 
    queryKey: ['members',  params.search, params.page], 
    queryFn:()=>{return getAllMembers({...params})}, 
    keepPreviousData: true 
  });
    
// Запит на видалення
  const deleteMember = useMutation({
    mutationFn:(id) => {
      return deleteMemberById(id)
    },onSuccess: () => {
      hendleSetSearch()
      refetch()
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Учасники'} hendleSearch={hendleSetSearch} lang={true}>
      <div className={styles.wrapper}>
        <h2>Ім’я та Прізвище</h2>
        <MainButton  variant='admin' className={styles.btn} onClick={()=>{
            router.push(addMembePath)
          }}>
            <Icon name={'plus_icon'} width={24} height={24} />
          {'Додати'}</MainButton >
      </div>

      {isError ?
        <MessageErrorLoading variant='admin'/> :
        <>
          {data && <MembersList 
            data={data} 
            hendleRemove={ deleteMember.mutate} 
            hendleSetPage={hendleSetPage}/>}
        </>
      }

      { deleteMember.isPending && <Loader/> }

      <UseAlert/>
    </SectionAdmin>
  )
}