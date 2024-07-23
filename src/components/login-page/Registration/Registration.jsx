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

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: (data) => {
      return registerAdmin(data)
    },
  })

  useEffect(() => {
    if (data) {
      //router.replace('/admin')
      //open('success')
      console.log(data)
    }
    if (isError) {
      console.log( error?.message)
      //resetForm()
      open('error',false)
    }

  },[data,isError]);

  const onSubmit = (data) => {
    mutate({email:data.email, password:data.password, name:'vlad'})
  };

  return (
    <Section title={'Реєстрація'} text={'Зареєструйтесь в системі'}>
      <RegistrationForm onSubmit={onSubmit} isSuccess={data?.token}/>

      <p className={styles.link}>Ви маєте акаунт? <Link href={'/admin/login'}>Авторизуватись</Link></p>

      <UseAlert/>

      {isPending && <Loader/>} 
    </Section>
  )
}