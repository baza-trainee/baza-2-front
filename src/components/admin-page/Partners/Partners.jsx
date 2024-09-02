'use client';
import styles from './Partners.module.scss'
import { useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deletePartnerById, getAllPartners } from '@/src/api/partners';
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import MainButton from '../../shared/MainButton/MainButton';
import PartnerList from './PartnerList/PartnerList';
import { Icon } from '../../shared/Icon/Icon';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import MessageErrorLoading from '../../shared/MessageErrorLoading/MessageErrorLoading';

export default function Partners() {
  const router = useRouter();
  const [ search, setSearch ] = useState('')
  const open = stateUseAlert(state => state.open);
  const addPartnerPath = '/admin/partners/add'

  const { isError, data, refetch } = useQuery({ 
    queryKey: ['partners', search], 
    queryFn:()=>{return getAllPartners({query:search})}, 
    keepPreviousData: true 
  });

  const deletePartner = useMutation({
    mutationFn:(id) => {
      return deletePartnerById(id)
    },onSuccess: () => {
      refetch()
    },onError:()=>{
      open('error', false)
    }})

  return(
    <SectionAdmin title={'Партнери'} hendleSearch={setSearch} defaultValue={search}>
      <MainButton  variant='admin' className={styles.btn} onClick={()=>{
        router.push(addPartnerPath)
      }}>
        <Icon name={'plus_icon'} width={24} height={24}/>
        {'Додати партнера'}</MainButton >
      {isError ?
        <MessageErrorLoading variant='admin'/> :
        <>
          {data?.results && 
            <PartnerList data={data?.results} hendleRemove={deletePartner.mutate}/>
          }
        </>
      }
      {deletePartner.isPending && <Loader/>}
      <UseAlert/>
    </SectionAdmin>
  )
}