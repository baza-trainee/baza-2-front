"use client";
import styles from './FormRecoverPassword.module.scss'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from '@/src/navigation';
import InputField from '../../../shared/inputs/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';

import { recoverPasswordDefaultValues, recoverPasswordSchema } from './recoverPasswordScheme';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';
import clsx from 'clsx';

export default function FormRecoverPassword({handleMutate}) {
  const router = useRouter();
  // Шлях для кнопки скасувати 
  const cancelBtnPath ='/admin/login'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isError, isDirty },
    reset
  } = useForm({ defaultValues: {...recoverPasswordDefaultValues}, resolver: zodResolver(recoverPasswordSchema), mode: 'onBlur'});

  const onSubmit = (data) => {
    handleMutate(data)
    reset()
  };

  // Управління станом кнопки Submit
  const isDisabled = () => {
    if (isError) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  }

  // Очищення поля повторити пароль
  const resetValue=()=>{
    setValue("confirmPassword",'')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <ul className={styles.list}>
        <li className={clsx(styles.list_item, styles.tooltip)}>
          <InputField
            id={"password"}
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Пароль"}
            onChange={resetValue}
            registerOptions={register("password", { ...recoverPasswordSchema.password })}
            isError={errors.password}
            isValid={isValid}
            version={"password"}
            label={'Новий пароль'}
          />

          <TooltipText className={styles._active} text={"Пароль обов'язково має містити принаймні одну цифру та одну латинську літеру. Він може також містити символи !@#$%^&*. Довжина пароля повинна бути від 8 до 14 символів."} position='right'/>
        </li>

        <li className={styles.list_item}>
          <InputField
            id={"confirm_password"}
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Повторіть пароль"}
            registerOptions={register("confirmPassword", { ...recoverPasswordSchema.confirmPassword })}
            isError={errors.confirmPassword}
            isValid={isValid}
            version={"password"}
            label={'Повторіть пароль'}
          />
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
            onClick={()=>{router.replace(cancelBtnPath)}}
          >
            {'Скасувати'}
          </MainButton>

        </li>
      </ul>
    </form>
  )
}