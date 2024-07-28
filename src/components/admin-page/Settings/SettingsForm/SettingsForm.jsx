"use client";
import styles from './SettingsForm.module.scss'

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/src/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginDefaultValues, loginSchema } from './loginScheme';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';
import { Icon } from '../../../shared/Icon/Icon';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';


export default function SettingsForm() {
  const router = useRouter()
  const pathname = usePathname()
  const [ visible, setVisible ] = useState(true);
  const[ modalOpen, setmodalOpen ] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...loginDefaultValues}, resolver: zodResolver(loginSchema), mode: 'onBlur'});

  //   "email": "user@example.com",
  //   "password": "password123"

  const resetForm = () => {
    setVisible(true)
    reset();
  }

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const { email, password } = JSON.parse(
        credentials
      );
      setValue('email', email);
      setValue('password', password);
    }
  }, [pathname]);

  const onSubmit = (data) => {
    console.log(data)
    setmodalOpen(true)

    localStorage.setItem(
      'credentials',
      JSON.stringify({...data})
    );
    resetForm()  
    setValue('email', data.email);
    setValue('password', data.password);
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
          <li className={styles.list_item}>
            <InputField
              id={"email"}
              maxLength={55}
              className={styles.item}
              required={false}
              placeholder={"Логін"}
              registerOptions={register("email", { ...loginSchema.email })}
              isError={errors.email}
              isValid={isValid}
              version={"input"}
              label={'Логін'}
            />
              <Icon className={styles.edit_black} width={24} height={24} name='edit'/>
            {errors.email && <p className={styles.error_modal}>{errors.email.message}</p>}
          </li>
          <li className={styles.item_wrapper} >
            <div className={styles.list_item}>
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
            </div>
            <MainButton
              variant='admin'
              className={styles.btn_edit}
              onClick={()=>{router.push('/admin/settings/edit')}}
            >
              <Icon className={styles.edit_white} width={24} height={24} name='edit'/>
            </MainButton>
          </li>
        </ul>

        <div className={styles.btns}>
          <MainButton
            type="submit"
            disabled={isDisabled()}
          >
            {'Зберегти зміни'}
          </MainButton>

          <MainButton
            variant='admin'
            className={styles.btn_cancel}
          // onClick={()=>{router.replace('/admin/login')}}
          >
            {'Скасувати'}
          </MainButton>
        </div >
      </form>

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
    </>
  )
}

