"use client";
import styles from './RegistrationForm.module.scss';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationDefaultValues, registrationSchema } from './registrationScheme';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';

export default function RegistrationForm({ onSubmit }) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ defaultValues: {...registrationDefaultValues}, resolver: zodResolver(registrationSchema), mode: 'onBlur'});

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
            registerOptions={register("email", { ...registrationSchema.email })}
            isError={errors.email}
            isValid={isValid}
            version={"input_admin"}
            label={'Електронна пошта'}
          />
        </li>
        <li>
          <InputField
            id={"password"}
            required={false}
            maxLength={15}
            className={styles.item}
            placeholder={"Пароль"}
            registerOptions={register("password", { ...registrationSchema.password })}
            isError={errors.password}
            isValid={isValid}
            version={"password"}
            label={'Пароль'}
          />
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