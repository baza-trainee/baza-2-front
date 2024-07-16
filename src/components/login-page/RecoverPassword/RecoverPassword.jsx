"use client";
import styles from './RecoverPassword.module.scss'
//import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import stateUseAlert from '@/src/state/stateUseAlert';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '@/src/navigation';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';
import MainButton from '../../shared/MainButton/MainButton';

import { recoverPasswordDefaultValues, recoverPasswordSchema } from './recoverPasswordScheme';
import UseAlert from '../../shared/UseAlert/UseAlert';
import { Icon } from '../../shared/Icon/Icon';

export default function RecoverPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...recoverPasswordDefaultValues}, resolver: zodResolver(recoverPasswordSchema), mode: 'onBlur'});


  // const { mutate, isPending, isError, data, isSuccess, error } = useMutation({
  //   mutationFn: (data) => {
  //     return passwordRequestReset(data)
  //   },
  // })

  const [ visible, setVisible ] = useState(false);
  const [ visible1, setVisible1 ] = useState(false);

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

  // useEffect(() => {
  //   if (data) {
  //     // sessionStorage.setItem(
  //     //   'access_token',
  //     //   data.token
  //     // )
  //     //router.replace('/login/signIn')
  //     resetForm()
  //     //open('success')
  //   }
  //   if (isError) {
  //     // console.log( error?.message)
  //     resetForm()
  //     open('error',false)
  //   }

  // },[data,isError]);

  // useEffect(() => {
  //   const token = sessionStorage.getItem('access_token');
  //   if (token) {
  //     //router.replace('/admin');
  //   }
  // });



  const onSubmit = (data) => {
    console.log(data)
    // mutate(data)
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
      <form onSubmit={handleSubmit()} className={styles.form}>
        <div className={styles.title}>
          <h2>Відновити пароль</h2>
          <p>Створіть новий пароль</p>
        </div>
        <ul className={styles.list}>
        <li className={styles.list_item} >
          <InputField
            id={"password"}
            maxLength={55}
            required={false}
            className={styles.item}
            type={visible?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("password", { ...recoverPasswordSchema.password })}
            isError={errors.password}
            isValid={isValid}
            version={"input"}
            label={'Новий пароль'}
          />
          <button type='button' className={styles.btn} onClick={()=>{setVisible(!visible)}}>
            <Icon width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
          </button>
          {errors.password && <p className={styles.error_modal}>{errors.password.message}</p>}
        </li>

        <li className={styles.list_item}>
          <InputField
            id={"confirm_password"}
            required={false}
            maxLength={55}
            className={styles.item}
            type={visible1?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("confirmPassword", { ...recoverPasswordSchema.confirmPassword })}
            isError={errors.confirmPassword?.message}
            isValid={isValid}
            version={"input"}
            label={'Повторіть пароль'}
          />
          <button type='button' className={styles.btn} onClick={()=>{setVisible1(!visible1)}}>
            <Icon width={24} height={24} name={visible1?'open_eye':'closed_eye'}/>
          </button>
         
          {errors.confirmPassword && <p className={styles.error_modal}>{errors.confirmPassword.message}</p>}
        </li>


          {/* <li>
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
          </li> */}
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
        {/* {isPending && <Loader/>}  */}
        <UseAlert/>
        {/* {isError ||data && <UseAlert/>} */}
      </form>
    </section>
  )
}