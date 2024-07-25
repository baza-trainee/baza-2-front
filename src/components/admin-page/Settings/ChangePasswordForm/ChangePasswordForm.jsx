"use client";
import styles from './ChangePasswordForm.module.scss';
//import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import { useRouter } from '@/src/navigation';
import { changePasswordDefaultValues, changePasswordScheme } from './ChangePasswordScheme';
import { changePassword } from '@/src/api/auth';
import { useMutation } from '@tanstack/react-query';


export default function ChangePasswordForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...changePasswordDefaultValues}, resolver: zodResolver(changePasswordScheme), mode: 'onBlur'});

  //   "email": "user@example.com",
  //   "password": "password123"

  const [ visible, setVisible ] = useState(true);
  const [ visible1, setVisible1 ] = useState(true);

  const resetForm = () => {
    setVisible(false)
    setVisible1(false)
    //setRemember(false)
    reset();
  }

  const savePassword =(data)=>{
    const credentials = sessionStorage.getItem('credentials');
    if (credentials) {
      const { email } = JSON.parse(
        credentials
      );
      sessionStorage.setItem('credentials',
        JSON.stringify({email,password:data.newPassword}))
    }

  }


  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn:(data) => {
      return changePassword(data)

    },onSuccess: () => {
      resetForm()
      router.replace('/admin/settings')
      savePassword(data)
    },})

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else return false;
  };

  //   "email": "user@example.com",
  //   "password": "password123"

  return (
    <form onSubmit={handleSubmit(mutate)} className={styles.form}>
      <ul className={styles.list}>

        <li className={styles.item_wrapper} >
          <div className={styles.list_item}>
            <InputField
              id={"oldPassword"}
              required={false}
              //disabled={true}
              maxLength={15}
              className={styles.item}
              type={visible?'text':'password'}
              placeholder={"Старий пароль"}
              registerOptions={register("oldPassword", { ...changePasswordScheme.oldPassword })}
              isError={errors.oldPassword}
              isValid={isValid}
              version={"input"}
              label={'Старий пароль'}
            />
            <button type='button' className={styles.btn} onClick={()=>{setVisible(!visible)}}>
              <Icon width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
            </button>
            {errors.oldPassword && <p className={styles.error_modal}>{errors.oldPassword.message}</p>}
          </div>
        </li>
        <li className={styles.item_wrapper} >
          <div className={styles.list_item}>
            <InputField
              id={"newPassword"}
              required={false}
              //disabled={true}
              maxLength={15}
              className={styles.item}
              type={visible1 ? 'text':'password'}
              placeholder={"Новий пароль"}
              registerOptions={register("newPassword", { ...changePasswordScheme.newPassword })}
              isError={errors.newPassword}
              isValid={isValid}
              version={"input"}
              label={'Новий пароль'}
            />
            <button type='button' className={styles.btn} onClick={()=>{setVisible1(!visible1)}}>
              <Icon width={24} height={24} name={visible1?'open_eye':'closed_eye'}/>
            </button>
            {errors.newPassword && <p className={styles.error_modal}>{errors.newPassword.message}</p>}
          </div>
        </li>

        </ul>
      <div className={styles.btns}>
        <MainButton
          type="submit"
          disabled={isDisabled()}
        >
          {'Підтвердити'}
        </MainButton>

        <MainButton
          variant='admin'
          className={styles.btn_cancel}
          onClick={()=>{router.replace('/admin/settings')}}
        >
          {'Скасувати'}
        </MainButton>

      </div > 
    </form>
  )
}
