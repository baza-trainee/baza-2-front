"use client";
import styles from './LoginSection.module.scss';

import { Link, useRouter } from '@/src/navigation';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';
import MainButton from '../../shared/MainButton/MainButton';
import { Icon } from '../../shared/Icon/Icon';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import stateUseAlert from '@/src/state/stateUseAlert';
import { loginDefaultValues, loginSchema } from './loginScheme';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { logIn } from '@/src/api/auth';
import UseAlert from '../../shared/UseAlert/UseAlert';

export default function LoginSection() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...loginDefaultValues}, resolver: zodResolver(loginSchema), mode: 'onChange'});


  const { mutate, isPending, isError, data, isSuccess } = useMutation({
    mutationFn: (data) => {
      return logIn(data)
    },
  })

  const [ visible, setVisible ] = useState(false);
  const [ remember, setRemember ] = useState(false);

  // const resetForm = () => {
  //   setVisible(false)
  //   setRemember(false)
  //   reset();
  // }

  if(isError){
    open('error', false)
    //resetForm()
   // return null
  }
  //localStorage.clear()
  if(data){
    //resetForm()
    localStorage.setItem(
      'access_token',
      data.token
    )
  }

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const { email, password, remember } = JSON.parse(
        credentials
      );
      setValue('email', email);
      setValue('password', password);
      setRemember( remember);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.replace('/admin');
    }
  });



  const onSubmit = (data) => {
    mutate(data)
    if (remember) {
      localStorage.setItem(
        'credentials',
        JSON.stringify({...data, remember:remember})
      );
    } else {
      localStorage.removeItem('credentials');
    }
  };
  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else if (!isValid) {
      return true;
    } else return false;
  };
  // {
  //   "email": "user@example.com",
  //   "password": "password123"
  // }
// "https://baza-trainee.tech/passwordReset?token=0d4edd6644700fcb2a84d2b597d3413b819cae2631acbfed424a35dac4ef260e&id=650fec0015d612e0367f5ba6"
  const email = watch('email');
  const password = watch('password');
  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>
          <h2>Вхід</h2>
          <p>Введіть дані для входу</p>
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
              registerOptions={register("email", { ...loginSchema.email })}
              isError={errors.email}
              isValid={isValid}
              version={"input"}
              label={'Електронна пошта'}
            />
            {errors.email && <p className={styles.error_modal}>{errors.email.message}</p>}
          </li>
          <li className={styles.list_item} >
            <InputField
              id={"password"}
              required={false}
              maxLength={55}
              className={styles.item}
              type={visible?'text':'password'}
              placeholder={"Пароль"}
              registerOptions={register("password", { ...loginSchema.password })}
              isError={errors.password}
              isValid={isValid}
              version={"input"}
              label={'Пароль'}
            />
            <button type='button' className={styles.btn} onClick={()=>{setVisible(!visible)}}>
              <Icon width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
            </button>
            {errors.password && <p className={styles.error_modal}>{errors.password.message}</p>}
          </li>

          <li>
            <div className={styles.item}>
              <label
                htmlFor={'remember'}
                className={clsx(styles.btn_option, styles.agree)}
              >
                <input
                  id={'remember'}
                  type="checkbox"
                  // {...register("agree", { ...loginSchema.remember })}
                  defaultChecked={remember}
                  onClick={(e)=>{setRemember(e.target.checked)}}
                ></input>
                <span className={clsx(styles.check, remember && styles._active)}>
                  <Icon name={'check'}/>
                  </span>

                {"Запам’ятати пароль"}
              </label>
            </div>
          </li>
        </ul>
        <MainButton
          type="submit"
          disabled={isDisabled()}
          // disabled={
          //   (!isDirty && !email && !password) ||
          //   !!Object.keys(errors).length
          // }
        >
          {'Увійти'}
        </MainButton>

        <Link href={'/login/forgot-password'}>Забули пароль?</Link>
        {isPending && <Loader/>} 

        {isError && <UseAlert/>}
      </form>
    </section>
  )
}