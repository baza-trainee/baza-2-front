"use client";
import { z } from 'zod';
import { Link } from '@/src/navigation';
import InputField from '../../shared/InputField/InputField';
import Loader from '../../shared/loader/Loader';
import MainButton from '../../shared/MainButton/MainButton';
import styles from './Registration.module.scss';
import { Icon } from '../../shared/Icon/Icon';
import { registrationDefaultValues, registrationSchema } from './registrationScheme';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import stateUseAlert from '@/src/state/stateUseAlert';

export default function Registration() {
  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...registrationDefaultValues}, resolver: zodResolver(registrationSchema), mode: 'onBlur'});

  const [ visible, setVisible ] = useState(false);
  const [ loader, setIsLoader ] = useState(false);

  const resetForm = () => {
    // setSpecialization('')
    // setPhone('')
    // setConvenientTime('')
    // setVisible(false)
    // setIsLoader(false)
    // reset();
  }
  const isSubmitted = (res) => {
    setIsLoader(false)
    if(res === 'error'){
      open('error')
    }
    open(res)
    resetForm()
  }
  const onSubmit = (data) => {
    // setIsLoader(true)
    // // Імітація відправки форми
    // setTimeout(()=>{
    //   isSubmitted('success')
    //   console.log(data);
    // },3000)
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
        <h2>Реєстрація</h2>
        <p>Зареєструйтесь в системі</p>
      </div>
      <ul className={styles.list}>
        <li>
          <InputField
            id={"email"}
            maxLength={55}
            className={styles.item}
            //type='email'
            placeholder={"Електронна пошта"}
            registerOptions={register("email", { ...registrationSchema.email })}
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
            maxLength={55}
            className={styles.item}
            type={visible?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("password", { ...registrationSchema.password })}
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
        <li className={styles.list_item}>
          <InputField
            id={"confirm_password"}
            //required={false}
            maxLength={55}
            className={styles.item}
            type={visible?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("confirmPassword", { ...registrationSchema.confirmPassword })}
            isError={errors.confirmPassword}
            isValid={isValid}
            version={"input"}
            label={'Підтвердіть пароль'}
          />
          <button type='button' className={styles.btn} onClick={()=>{setVisible(!visible)}}>
            <Icon width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
          </button>
         
          {errors.confirmPassword && <p className={styles.error_modal}>{errors.confirmPassword.message}</p>}
        </li>


      </ul>
      <MainButton
        type="submit"
        //disabled={isDisabled()}
        className={styles.submit}
      >
        {'Зареєструватись'}
      </MainButton>

      <p>Ви маєте акаунт? <Link href={'/login'}>Авторизуватись</Link></p>
      {/* {loader && <Loader/>} */}


    </form>
  </section>
  )
}