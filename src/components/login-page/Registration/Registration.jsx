"use client";
import styles from './Registration.module.scss';
import { useState } from 'react';
import { registerAdmin } from '@/src/api/auth';
import { Link, useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import stateUseAlert from '@/src/state/stateUseAlert';
import Loader from '../../shared/loader/Loader';
import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import AdminModal from '../../modals/AdminModal/AdminModal';
import { credentialsSessionStorage } from '@/src/state/stateCredentials';

export default function Registration() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();
 // Шлях на сторінку login
  const loginPath ='/admin/login'

  const [ modal, setModal ] = useState(false)

  const isError=()=>{
    credentialsSessionStorage.reset()
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
    setModal(false)
    router.replace(loginPath)
  }

  const onSubmit = (data) => {
    mutate({email:data.email, password:data.password, name:'admin'})
    credentialsSessionStorage.set({email:data.email, password:data.password})
  };

  return (
    <Section title={'Реєстрація'} text={'Зареєструйтесь в системі'}>
      <RegistrationForm onSubmit={onSubmit}/>

      <p className={styles.link}>Ви маєте акаунт? <Link href={loginPath}>Авторизуватись</Link></p>

      {isPending && <Loader/>} 
     
      <AdminModal isOpen={modal} handleCallback={closeModal} title={'Реєстрація успішна'}/>

      <UseAlert/>
    </Section>
  )
}