"use client";
import styles from './SettingsForm.module.scss'

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/src/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema } from './loginScheme';
import InputField from '../../../shared/inputs/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import { credentialsSessionStorage } from '@/src/state/stateCredentials';


export default function SettingsForm() {
  const router = useRouter()
  const pathname = usePathname()
  const[ modalOpen, setmodalOpen ] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...loginDefaultValues}, resolver: zodResolver(loginSchema), mode: 'onBlur'});

  const resetForm = () => {
    reset();
  }

  useEffect(() => {
    const credentials = credentialsSessionStorage.get()
    if (credentials) {
      const { email, password } = credentials
      setValue('email', email);
      setValue('password', password);
    }
  }, [pathname]);

  const onSubmit = (data) => {
    // console.log(data)
    // setmodalOpen(true)

    // sessionStorage.setItem(
    //   'credentials',
    //   JSON.stringify({...data})
    // );
    // resetForm()  
    // setValue('email', data.email);
    // setValue('password', data.password);
  };


  const isDisabled = () => {
    if (Object.keys(errors).length > 0) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  }

  const closeModal = useCallback(()=>{
    setmodalOpen(false)
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ul className={styles.list}>
          <li>
            <InputField
              id={"email"}
              maxLength={55}
              disabled={true}
              className={styles.item}
              required={false}
              placeholder={"Логін"}
              registerOptions={register("email", { ...loginSchema.email })}
              isError={errors.email}
              isValid={isValid}
              version={"input_admin"}
              iconName={'edit'}
              label={'Логін'}
            />
          </li>
          <li className={styles.item_wrapper} >
            <InputField
              id={"password"}
              required={false}
              maxLength={15}
              disabled={true}
              className={styles.item}
              placeholder={"Пароль"}
              registerOptions={register("password", { ...loginSchema.password })}
              isError={errors.password}
              isValid={isValid}
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

        {/* <div className={styles.btns}>
          <MainButton
            className={styles.btn}
            type="submit"
            disabled={isDisabled()}
          >
            {'Зберегти зміни'}
          </MainButton>

          <MainButton
            variant='admin'
            className={styles.btn_cancel}
          >
            {'Скасувати'}
          </MainButton>
        </div > */}
      </form>

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
    </>
  )
}

