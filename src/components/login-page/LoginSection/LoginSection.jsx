"use client";
import styles from './LoginSection.module.scss';
import { useEffect } from 'react';
import { Link, useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { logIn, token } from '@/src/api/auth';
import Loader from '../../shared/loader/Loader';
import stateUseAlert from '@/src/state/stateUseAlert';
import UseAlert from '../../shared/UseAlert/UseAlert';
import LoginForm from './loginForm/loginForm';
import Section from '../Section/Section';

export default function LoginSection() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();
  //   "email": "user@example.com",
  //   "password": "password123"

  const logInUser = async (data) => {
    const response = await fetch(
      `https://baza2.crabdance.com/api/v1/auth//login`,
      { method: "POST",
        body: JSON.stringify(data),
        //credentials: "include", // include
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      },
    );
    if (response.ok) {

      console.log(response)
      return response.token
      //router.push('/admin');
      //setIsShow(true);
    } else {
      //router.push('/');
    }
    console.log(response)
  };


  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: (data) => {
      return logIn(data)
    },
  })

  useEffect(() => {
    if (isError) {
      console.log( error?.message)
      open('error', false)
    }
  },[isError]);

  useEffect(() => {
    if (token.get()) {
      router.replace('/admin');
    }
  });

  return (
    <Section title={'Вхід'} text={ 'Введіть дані для входу' }>
      <LoginForm handleMutate={mutate}/>

      <Link className={styles.link} href={'/admin/forgot-password'}>Забули пароль?</Link>

      {isPending && <Loader/>} 

      <UseAlert title='Невірний логін або пароль' text='Перевірте данні та спробуйте ще'/>
    </Section>
  )
}