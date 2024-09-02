"use client";

import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getData, updateEmployed } from '@/src/api/achievements'
import stateUseAlert from '@/src/state/stateUseAlert';
import Loader from '../../shared/loader/Loader';
import SectionAdmin from '../SectionAdmin/SectionAdmin';
import CounterForm from './CounterForm/CounterForm';
import AdminModal from '../../modals/AdminModal/AdminModal';
import UseAlert from '../../shared/UseAlert/UseAlert';

export default function Counter() {
  const[ modalOpen, setmodalOpen ] = useState(false);
  const open = stateUseAlert(state => state.open);

  const employed = useQuery({ 
    queryKey: ['employed'], 
    queryFn: getData,
    onError:()=>{
      open('error', false)
    }});

  const { mutate, isPending } = useMutation({
    mutationFn:(data) => {
      return updateEmployed(data)
    },onSuccess: () => {
      setmodalOpen(true)
      employed.refetch()
    },onError:()=>{
      open('error', false)
    }})

  const closeModal = useCallback(()=>{
    setmodalOpen(false)
  })

  return (
    <SectionAdmin title={'Каунтер'}>
      <CounterForm defaultValues={employed.data} hendleMutate={mutate}/>
  
      {isPending && <Loader/>}

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Дані успішно збережено'} 
        btn={true}>
      </AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}