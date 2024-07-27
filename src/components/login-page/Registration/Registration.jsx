"use client";
import styles from './Registration.module.scss';
import { useEffect, useState } from 'react';
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

  const [ modal, setModal ] = useState(false)

  const isError=()=>{
    sessionStorage.removeItem('credentials')
    open('error',false)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return registerAdmin(data)
    },onSuccess: () => {
      setModal(true)
    },onError: () => {
      isError()
    },
  })

  const closeModal=()=>{
    setModal(true)
    router.replace('/admin')
  }

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
      <AdminModal isOpen={modal} title={'Реєстрація успішна'}/>
      {isPending && <Loader/>} 
    </Section>
  )
}