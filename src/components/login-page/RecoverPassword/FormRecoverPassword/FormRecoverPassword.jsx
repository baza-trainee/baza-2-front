"use client";
import styles from './FormRecoverPassword.module.scss'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from '@/src/navigation';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';

import { recoverPasswordDefaultValues, recoverPasswordSchema } from './recoverPasswordScheme';

export default function FormRecoverPassword({handleMutate}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...recoverPasswordDefaultValues}, resolver: zodResolver(recoverPasswordSchema), mode: 'onBlur'});

  const onSubmit = (data) => {
    handleMutate(data)
    reset()
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
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Пароль"}
            registerOptions={register("password", { ...recoverPasswordSchema.password })}
            isError={errors.password}
            isValid={isValid}
            version={"password"}
            label={'Новий пароль'}
          />
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
            onClick={()=>{router.replace('/admin/login')}}
          >
            {'Скасувати'}
          </MainButton>

        </li>
      </ul>
    </form>
  )
}