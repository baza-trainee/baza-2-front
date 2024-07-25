"use client";
import styles from './SettingsForm.module.scss'

//import styles from './loginForm.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema } from './loginScheme';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import { useRouter } from '@/src/navigation';

export default function SettingsForm({ handleMutate }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset
  } = useForm({ defaultValues: {...loginDefaultValues}, resolver: zodResolver(loginSchema), mode: 'onBlur'});

  //   "email": "user@example.com",
  //   "password": "password123"

  const [ visible, setVisible ] = useState(true);
  //const [ remember, setRemember ] = useState(false);

  const resetForm = () => {
    setVisible(true)
    //setRemember(false)
    reset();
  }

  useEffect(() => {
    const credentials = sessionStorage.getItem('credentials');
    if (credentials) {
      const { email, password } = JSON.parse(
        credentials
      );
      setValue('email', email);
      setValue('password', password);
    }
  }, []);

  const onSubmit = (data) => {
    // handleMutate(data)
    // resetForm()
    // if (remember) {
    //   localStorage.setItem(
    //     'credentials',
    //     JSON.stringify({...data, remember:remember})
    //   );
    // } else {
    //   localStorage.removeItem('credentials');
    // }
  };


  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else return false;
  };

  //   "email": "user@example.com",
  //   "password": "password123"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <InputField
            id={"email"}
            maxLength={55}
            className={styles.item}
            required={false}
            disabled={true}
            //type='email'
            placeholder={"Логін"}
            registerOptions={register("email", { ...loginSchema.email })}
            //isError={errors.email}
            //isValid={isValid}
            version={"input"}
            label={'Логін'}
          />
          {/* <button type='button' className={styles.btn} > */}
            <Icon className={styles.edit_black} width={24} height={24} name='edit'/>
          {/* </button> */}
          {errors.email && <p className={styles.error_modal}>{errors.email.message}</p>}
        </li>
        <li className={styles.item_wrapper} >
          <div className={styles.list_item}>
            <InputField
              id={"password"}
              required={false}
              disabled={true}
              maxLength={55}
              className={styles.item}
              type={visible?'text':'password'}
              placeholder={"Пароль"}
              registerOptions={register("password", { ...loginSchema.password })}
              //isError={errors.password}
              //isValid={isValid}
              version={"input"}
              label={'Пароль'}
            />
            <button type='button' className={styles.btn} onClick={()=>{setVisible(!visible)}}>
              <Icon width={24} height={24} name={visible?'open_eye':'closed_eye'}/>
            </button>
            {errors.password && <p className={styles.error_modal}>{errors.password.message}</p>}
          </div>
          <MainButton
            variant='admin'
            className={styles.btn_edit}
            onClick={()=>{router.push('/admin/settings/edit')}}
          >
            <Icon className={styles.edit_white} width={24} height={24} name='edit'/>
          </MainButton>
        </li>
{/* 
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
        </li> */}
      </ul>
{/* 
      <div className={styles.btns}>
        <MainButton
          type="submit"
          disabled={true}
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

      </div > */}
    </form>
  )
}

