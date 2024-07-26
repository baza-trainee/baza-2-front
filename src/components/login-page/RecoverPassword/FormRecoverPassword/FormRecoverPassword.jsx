"use client";
import styles from './FormRecoverPassword.module.scss'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from '@/src/navigation';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';

import { recoverPasswordDefaultValues, recoverPasswordSchema } from './recoverPasswordScheme';
import { Icon } from '../../../shared/Icon/Icon';
import { useState } from 'react';

export default function FormRecoverPassword({handleMutate }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...recoverPasswordDefaultValues}, resolver: zodResolver(recoverPasswordSchema), mode: 'onBlur'});


  const [ visible, setVisible ] = useState(false);
  const [ visible1, setVisible1 ] = useState(false);

  const resetForm = () => {
    setVisible(false)
    setVisible1(false)
    reset();
  }
  
  const onSubmit = (data) => {
    handleMutate(data)
    resetForm()
  };

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else return false;
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          maxLength={15}
          className={styles.item}
          type={visible1?'text':'password'}
          placeholder={"Повторіть пароль"}
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
      <li className={styles.btns}>
        <MainButton
          type="submit"
          disabled={isDisabled()}
        >
          {'Підтвердити'}
        </MainButton>

        <MainButton
          variant='admin'
          className={styles.btn_cancel}
          onClick={()=>{router.replace('/admin/login')}}
        >
          {'Скасувати'}
        </MainButton>

      </li>
    </ul>
  </form>
  )
}