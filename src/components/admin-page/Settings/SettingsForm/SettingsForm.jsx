"use client";
import styles from './SettingsForm.module.scss'
import { useEffect } from 'react';
import { usePathname, useRouter } from '@/src/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema } from './loginScheme';
import InputField from '../../../shared/inputs/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import { credentialsSessionStorage } from '@/src/state/stateCredentials';

export default function SettingsForm() {
  const router = useRouter()
  const pathname = usePathname()

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({ 
    defaultValues: {...loginDefaultValues}, 
    resolver: zodResolver(loginSchema), 
  });

  useEffect(() => {
    const credentials = credentialsSessionStorage.get()
    if (credentials) {
      const { email, password } = credentials
      setValue('email', email);
      setValue('password', password);
    }
  }, [pathname]);

  return (
    <>
      <form onSubmit={handleSubmit(console.log)} className={styles.form}>
        <ul className={styles.list}>
          <li>
            <InputField
              id={"email"}
              disabled={true}
              className={styles.item}
              required={false}
              placeholder={"Логін"}
              registerOptions={register("email", { ...loginSchema.email })}
              version={"input_admin"}
              iconName={'edit_black'}
              label={'Логін'}
            />
          </li>
          <li className={styles.item_wrapper} >
            <InputField
              id={"password"}
              required={false}
              disabled={true}
              className={styles.item}
              placeholder={"Пароль"}
              registerOptions={register("password", { ...loginSchema.password })}
              version={"password"}
              label={'Пароль'}
            />
            <MainButton
              variant='admin'
              className={styles.btn_edit}
              onClick={()=>{router.push('/admin/settings/edit')}}
            >
              <Icon className={styles.edit_white} width={24} height={24} name='edit'/>
            </MainButton>
          </li>
        </ul>
      </form>
    </>
  )
}

