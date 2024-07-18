"use client";
import styles from './LoginSection.module.scss';
import { useEffect } from 'react';
import { Link, useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { logIn } from '@/src/api/auth';
import Loader from '../../shared/loader/Loader';
import stateUseAlert from '@/src/state/stateUseAlert';
import UseAlert from '../../shared/UseAlert/UseAlert';
import LoginForm from './loginForm/loginForm';

export default function LoginSection() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();
  //   "email": "user@example.com",
  //   "password": "password123"

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: (data) => {
      return logIn(data)
    },
  })

  useEffect(() => {
    if (data) {
      sessionStorage.setItem(
        'access_token',
        data.token
      )
    }
    if (isError) {
      console.log( error?.message)
      open('error', false)
    }
  },[data,isError]);

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      router.replace('/admin');
    }
  });

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        
        <div className={styles.title}>
          <h2>Вхід</h2>
          <p>Введіть дані для входу</p>
        </div>
        
        <LoginForm handleMutate={mutate} isSuccess={data?.token}/>

        <Link href={'/admin/forgot-password'}>Забули пароль?</Link>

        {isPending && <Loader/>} 

        <UseAlert title='Невірний логін або пароль' text='Перевірте данні та спробуйте ще'/>
      </div>
    </section>
  )
}