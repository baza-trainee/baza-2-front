"use client";
import styles from './FormForgotPassword.module.scss'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from '@/src/navigation';
import InputField from '../../../shared/inputs/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { forgotPasswordDefaultValues, forgotPasswordSchema } from './forgotPasswordScheme';

export default function FormForgotPassword({ handleMutate }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...forgotPasswordDefaultValues}, resolver: zodResolver(forgotPasswordSchema), mode: 'onBlur'});

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
        <li>
          <InputField
            id={"email"}
            maxLength={55}
            className={styles.item}
            required={false}
            placeholder={"Електронна пошта"}
            registerOptions={register("email", { ...forgotPasswordSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input_admin"}
            label={'Електронна пошта'}
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