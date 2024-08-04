"use client";
import styles from './RegistrationForm.module.scss';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationDefaultValues, registrationSchema } from './registrationScheme';
import InputField from '../../../shared/inputs/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';

export default function RegistrationForm({ onSubmit }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: {isError, errors, isValid, isDirty },
  } = useForm({ defaultValues: {...registrationDefaultValues}, resolver: zodResolver(registrationSchema), mode: 'onBlur'});

  const isDisabled = () => {
    if (isError) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  };

  const resetValue=()=>{
    setValue("confirmPassword",'')
  }

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
            registerOptions={register("email", { ...registrationSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input_admin"}
            label={'Електронна пошта'}
          />
        </li>
        <li className={styles.tooltip} >
          <InputField
            id={"password"}
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Пароль"}
            onChange={resetValue}
            registerOptions={register("password", { ...registrationSchema.password })}
            isError={errors.password}
            isValid={isValid}
            version={"password"}
            label={'Пароль'}
          />
           <TooltipText className={styles._active} text={"Пароль обов'язково має містити принаймні одну цифру та одну латинську літеру. Він може також містити символи !@#$%^&*. Довжина пароля повинна бути від 8 до 14 символів."} position='right'/>
        </li>
        <li>
          <InputField
            id={"confirm_password"}
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Пароль"}
            registerOptions={register("confirmPassword", { ...registrationSchema.confirmPassword })}
            isError={errors.confirmPassword}
            isValid={isValid}
            version={"password"}
            label={'Підтвердіть пароль'}
          />
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