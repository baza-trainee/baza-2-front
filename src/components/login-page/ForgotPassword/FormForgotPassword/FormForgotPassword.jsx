"use client";
import styles from './FormForgotPassword.module.scss'
//import clsx from 'clsx';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import stateUseAlert from '@/src/state/stateUseAlert';
import { useRouter } from '@/src/navigation';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { forgotPasswordDefaultValues, forgotPasswordSchema } from './forgotPasswordScheme';


export default function FormForgotPassword({ onSubmit, isSuccess }) {
  //const open = stateUseAlert(state => state.open);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...forgotPasswordDefaultValues}, resolver: zodResolver(forgotPasswordSchema), mode: 'onBlur'});


  const resetForm = () => {
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