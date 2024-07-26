"use client";
import styles from './Registration.module.scss';
import { useEffect } from 'react';
import { registerAdmin } from '@/src/api/auth';
import { Link, useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import stateUseAlert from '@/src/state/stateUseAlert';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import RegistrationForm from './RegistrationForm/RegistrationForm';

export default function Registration() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const isError=()=>{
    sessionStorage.removeItem('credentials')
    open('error',false)
  }

  const { mutate, isPending, data } = useMutation({
    mutationFn: (data) => {
      return registerAdmin(data)
    },onSuccess: () => {
      router.replace('/admin')
    },onError: () => {
      isError()
    },
  })

  const onSubmit = (data) => {
    mutate({email:data.email, password:data.password, name:'vlad'})
    sessionStorage.setItem('credentials',
      JSON.stringify({email:data.email, password:data.password}))
  };

  return (
    <Section title={'Реєстрація'} text={'Зареєструйтесь в системі'}>
      <RegistrationForm onSubmit={onSubmit}/>

      <p className={styles.link}>Ви маєте акаунт? <Link href={'/admin/login'}>Авторизуватись</Link></p>

      <UseAlert/>

      {isPending && <Loader/>} 
    </Section>
  )
}