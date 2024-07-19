"use client";

import { useEffect, useState } from 'react';
import stateUseAlert from '@/src/state/stateUseAlert';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/src/navigation';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import FormRecoverPassword from './FormRecoverPassword/FormRecoverPassword';

export default function RecoverPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data)

    // mutate(data)
  };


  return (
    <Section title={'Відновити пароль'} text={'Створіть новий пароль'}>
      <FormRecoverPassword onSubmit={onSubmit}/>
       {/* {isPending && <Loader/>}  */}
       <UseAlert/>
    </Section>
  )
}