"use client";
import styles from './ChangePasswordForm.module.scss';
import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from '@/src/navigation';
import { changePasswordDefaultValues, changePasswordScheme } from './ChangePasswordScheme';
import { changePassword } from '@/src/api/auth';
import { useMutation } from '@tanstack/react-query';
import Loader from '@/src/components/shared/loader/Loader';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import stateUseAlert from '@/src/state/stateUseAlert';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import InputField from '../../../shared/InputField/InputField';
import MainButton from '../../../shared/MainButton/MainButton';

export default function ChangePasswordForm() {
  const router = useRouter()
  const open = stateUseAlert(state => state.open);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...changePasswordDefaultValues}, resolver: zodResolver(changePasswordScheme), mode: 'onBlur'});

  const [ password, setPassword ] = useState('');
  const[ modalOpen, setmodalOpen ] = useState(false);

  const resetForm = () => {
    setPassword('')
    reset();
  }

  const savePassword =()=>{
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const { email } = JSON.parse(
        credentials
      );
      localStorage.setItem('credentials',
        JSON.stringify({email, password:password}))
    }

    { const credentials = sessionStorage.getItem('credentials');
      if(credentials){
        const { email } = JSON.parse(credentials);
        sessionStorage.setItem(
          'credentials',
          JSON.stringify({email, password:password})
        ); 
      }
    } 
    resetForm()
    setmodalOpen(true)
  }

  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/settings')
  })

  const { mutate, isPending } = useMutation({
    mutationFn:(data) => {
      return changePassword(data)

    },onSuccess: () => {
      savePassword()
    },onError:()=>{
      open('error', false)
    }})

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

  const onSubmit = (data) => {
    console.log(data)
    const newData={oldPassword:data.oldPassword, newPassword:data.newPassword}
    mutate(newData)
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ul className={styles.list}>
          <li>
            <InputField
              id={"oldPassword"}
              required={false}
              maxLength={15}
              className={styles.item}
              placeholder={"Старий пароль"}
              registerOptions={register("oldPassword", { ...changePasswordScheme.oldPassword })}
              isError={errors.oldPassword}
              isValid={isValid}
              version={"password"}
              label={'Старий пароль'}
            />
          </li>

          <li>
            <InputField
              id={"newPassword"}
              required={false}
              onInput={(e)=>{setPassword(e.target.value)}}
              maxLength={15}
              className={styles.item}
              placeholder={"Новий пароль"}
              registerOptions={register("newPassword", { ...changePasswordScheme.newPassword })}
              isError={errors.newPassword}
              isValid={isValid}
              version={"password"}
              label={'Новий пароль'}
            />
          </li>

          <li>
            <InputField
              id={"confirm_password"}
              required={false}
              maxLength={15}
              className={styles.item}
              placeholder={"Пароль"}
              registerOptions={register("confirmPassword", { ...changePasswordScheme.confirmPassword })}
              isError={errors.confirmPassword}
              isValid={isValid}
              version={"password"}
              label={'Підтвердіть пароль'}
            />
          </li>
        </ul>
        
        <div className={styles.btns}>
          <MainButton
            type="submit"
            className={styles.btn}
            disabled={isDisabled()}
          >
            {'Зберегти зміни'}
          </MainButton>

          <MainButton
            variant='admin'
            className={styles.btn_cancel}
            onClick={()=>{router.replace('/admin/settings')}}
          >
            {'Скасувати'}
          </MainButton>

        </div > 
      </form>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </>
  )
}
