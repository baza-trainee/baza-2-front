"use client";
import styles from './ForgotPassword.module.scss'
//import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import stateUseAlert from '@/src/state/stateUseAlert';
import { passwordRequestReset } from '@/src/api/auth';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '@/src/navigation';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';
import MainButton from '../../shared/MainButton/MainButton';
//import { Icon } from '../../shared/Icon/Icon';



import { forgotPasswordDefaultValues, forgotPasswordSchema } from './forgotPasswordScheme';



import UseAlert from '../../shared/UseAlert/UseAlert';

export default function ForgotPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...forgotPasswordDefaultValues}, resolver: zodResolver(forgotPasswordSchema), mode: 'onBlur'});


  const { mutate, isPending, isError, data, isSuccess, error } = useMutation({
    mutationFn: (data) => {
      return passwordRequestReset(data)
    },
  })

  //const [ visible, setVisible ] = useState(false);
  // const [ remember, setRemember ] = useState(false);

  const resetForm = () => {
    //setVisible(false)
    //setRemember(false)
    reset();
  }

  // useEffect(() => {
  //   const credentials = localStorage.getItem('credentials');
  //   if (credentials) {
  //     const { email, password, remember } = JSON.parse(
  //       credentials
  //     );
  //     setValue('email', email);
  //     setValue('password', password);
  //     setRemember( remember);
  //   }
  // }, []);

  useEffect(() => {
    if (data) {
      // const token = data?.token;
      // router.replace(`/login/recover-password/${token}`);
      resetForm()
      //open('success')
    }
    if (isError) {
      console.log( error?.message)
      resetForm()
      open('error',false)
    }

  },[data,isError]);

  const onSubmit = (data) => {
    mutate(data)
  };


  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else if (!isValid) {
      return true;
    } else return false;
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>
          <h2>Забули пароль?</h2>
          <p>Вкажіть,Вашу електронну адресу,щоб підтвердити Вашу особу</p>
        </div>
        <ul className={styles.list}>
          <li>
            <InputField
              id={"email"}
              maxLength={55}
              className={styles.item}
              required={false}
              //type='email'
              placeholder={"Електронна пошта"}
              registerOptions={register("email", { ...forgotPasswordSchema.email })}
              isError={errors.email}
              isValid={isValid}
              version={"input"}
              label={'Електронна пошта'}
            />
            {errors.email && <p className={styles.error_modal}>{errors.email.message}</p>}
          </li>
            <li className={styles.btns}>
              <MainButton
                type="submit"
                disabled={isDisabled()}
                // disabled={
                //   (!isDirty && !email && !password) ||
                //   !!Object.keys(errors).length
                // }
              >
                {'Підтвердити'}
              </MainButton>

              <MainButton
                variant='modal'
                className={styles.btn_cancel}
                onClick={()=>{router.replace('/login')}}
              >
                {'Скасувати'}
              </MainButton>

            </li>
        </ul>


        {/* <Link href={'/login/forgot-password'}>Забули пароль?</Link> */}
        {isPending && <Loader/>} 
        <UseAlert/>
        {/* {isError ||data && <UseAlert/>} */}
      </form>
    </section>
  )
}