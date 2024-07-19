"use client";

import { useEffect } from 'react';
import stateUseAlert from '@/src/state/stateUseAlert';
import { passwordRequestReset } from '@/src/api/auth';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '@/src/navigation';
import Loader from '../../shared/loader/Loader';

import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import FormForgotPassword from './FormForgotPassword/FormForgotPassword';

export default function ForgotPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const { mutate, isPending, isError, data, isSuccess, error } = useMutation({
    mutationFn: (data) => {
      return passwordRequestReset(data)
    },
  })

  useEffect(() => {
    if (data) {
      // const token = data?.token;
      router.replace(`/login/recover-password/${'token'}`);
      //open('success')
    }
    if (isError) {
      console.log( error?.message)
      open('error',false)
    }

  },[data,isError]);

  const onSubmit = (data) => {
   // mutate(data)
    router.replace('/admin/recover-password/123')
  };

  return (
    <Section title={'Забули пароль?'} text={'Вкажіть,Вашу електронну адресу,щоб підтвердити Вашу особу'}>

      <FormForgotPassword onSubmit={onSubmit} isSuccess={data}/>

      {isPending && <Loader/>} 

      <UseAlert/>
    </Section>
  )
}