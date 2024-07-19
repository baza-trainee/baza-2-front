"use client";
import styles from './RegistrationForm.module.scss';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import { registrationDefaultValues, registrationSchema } from './registrationScheme';

export default function RegistrationForm({ onSubmit, isSuccess }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...registrationDefaultValues}, resolver: zodResolver(registrationSchema), mode: 'onBlur'});

  const [ visible, setVisible ] = useState(false);
  const [ visible1, setVisible1 ] = useState(false);

  const resetForm = () => {
    setVisible(false)
    setVisible1(false)
    reset();
  }

  if(isSuccess){ resetForm() }

  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else return false;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <ul className={styles.list}>
        <li>
          <InputField
            id={"email"}
            maxLength={55}
            className={styles.item}
            required={false}
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
            required={false}
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
            required={false}
            maxLength={55}
            className={styles.item}
            type={visible1?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("confirmPassword", { ...registrationSchema.confirmPassword })}
            isError={errors.confirmPassword?.message}
            isValid={isValid}
            version={"input"}
            label={'Підтвердіть пароль'}
          />
          <button type='button' className={styles.btn} onClick={()=>{setVisible1(!visible1)}}>
            <Icon width={24} height={24} name={visible1?'open_eye':'closed_eye'}/>
          </button>
         
          {errors.confirmPassword && <p className={styles.error_modal}>{errors.confirmPassword.message}</p>}
        </li>


      </ul>

      <MainButton
        type="submit"
        disabled={isDisabled()}
        className={styles.submit}
      >
        {'Зареєструватись'}
      </MainButton>
    </form>
  )
}