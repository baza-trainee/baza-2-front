"use client";
import styles from './loginForm.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema } from './loginScheme';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';

export default function LoginForm({ handleMutate }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...loginDefaultValues}, resolver: zodResolver(loginSchema), mode: 'onBlur'});

  //   "email": "user@example.com",
  //   "password": "password123"

  const [ visible, setVisible ] = useState(false);
  const [ remember, setRemember ] = useState(false);

  const resetForm = () => {
    setVisible(false)
    setRemember(false)
    reset();
  }

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const { email, password, remember } = JSON.parse(
        credentials
      );
      setValue('email', email);
      setValue('password', password);
      setRemember( remember);
    }
  }, []);

  const onSubmit = (data) => {
    handleMutate(data)
    resetForm()
    if (remember) {
      localStorage.setItem(
        'credentials',
        JSON.stringify({...data, remember:remember})
      );
    } else {
      localStorage.removeItem('credentials');
    }
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
            registerOptions={register("email", { ...loginSchema.email })}
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
            required={false}
            maxLength={15}
            className={styles.item}
            type={visible?'text':'password'}
            placeholder={"Пароль"}
            registerOptions={register("password", { ...loginSchema.password })}
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

        <li>
          <div className={styles.item}>
            <label
              htmlFor={'remember'}
              className={clsx(styles.btn_option, styles.agree)}
            >
              <input
                id={'remember'}
                type="checkbox"
                defaultChecked={remember}
                onClick={(e)=>{setRemember(e.target.checked)}}
              ></input>
              <span className={clsx(styles.check, remember && styles._active)}>
                <Icon name={'check'}/>
                </span>

              {"Запам’ятати пароль"}
            </label>
          </div>
        </li>
      </ul>

      <MainButton
        type="submit"
        disabled={isDisabled()}
      >
        {'Увійти'}
      </MainButton>
    </form>
  )
}