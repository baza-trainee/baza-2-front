"use client";

import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { logIn } from '@/src/api/auth';
import Loader from '../../shared/loader/Loader';
import stateUseAlert from '@/src/state/stateUseAlert';
import UseAlert from '../../shared/UseAlert/UseAlert';
import LoginForm from './loginForm/loginForm';
import Section from '../Section/Section';

export default function LoginSection() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const { mutate, isPending, reset } = useMutation({
    mutationFn: (data) => {
      return logIn(data)
    },onSuccess:()=>{
      router.replace('/admin')
      reset()
    },onError:()=>{
      open('error', false)
    }
  })


  return (
    <Section title={'Вхід'} text={ 'Введіть дані для входу' }>
      <LoginForm handleMutate={mutate}/>

      {isPending && <Loader/>} 

      <UseAlert title='Невірний логін або пароль' text='Перевірте данні та спробуйте ще'/>
    </Section>
  )
}