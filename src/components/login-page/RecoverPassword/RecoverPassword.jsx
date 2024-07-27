"use client";

import { useRouter } from '@/src/navigation';
import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import FormRecoverPassword from './FormRecoverPassword/FormRecoverPassword';
import { getSearchParamsObject } from '@/src/lib/utils/getSearchParamsObject';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { passwordReset } from '@/src/api/auth';
import stateUseAlert from '@/src/state/stateUseAlert';
import Loader from '../../shared/loader/Loader';

export default function RecoverPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const[ tokenReset, setTokenReset] = useState(null)

  useEffect(()=>{
    const search = document?.location.search 
    if(!search){
      router.replace('/admin/login')
    }else{
      const params = new URLSearchParams(search);
      setTokenReset({... getSearchParamsObject(params)})
    }
  },[])

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return passwordReset(data)
    },onSuccess: () => {
      router.replace('/admin/login')
    },onError:()=>{
      open('error', false)
    }
  })

  const errorClose= useCallback(()=>{
    router.replace('/admin/login')
  })

  const onSubmit = (data) => {
    const newData = {userId:tokenReset.id, token:tokenReset.token, password: data.password}
    mutate(newData)
  };

  return (
    <Section title={'Відновити пароль'} text={'Створіть новий пароль'}>
      <FormRecoverPassword handleMutate={onSubmit}/>
       {isPending && <Loader/>} 
       <UseAlert handleClose={errorClose}/>
    </Section>
  )
}