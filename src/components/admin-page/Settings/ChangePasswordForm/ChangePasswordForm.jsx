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
import TooltipText from '@/src/components/shared/TooltipText/TooltipText';
import { credentialslocalStorage, credentialsSessionStorage } from '@/src/state/stateCredentials';

export default function ChangePasswordForm() {
  const router = useRouter()
  // Відкриття модалки Error
  const open = stateUseAlert(state => state.open);
  const [ password, setPassword ] = useState('');
  const[ modalOpen, setmodalOpen ] = useState(false);

  // Шлях для кнопки скасувати 
  const cancelBtnPath ='/admin/settings'

  // Валідація форми 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isError, errors, isValid, isDirty },
    reset
  } = useForm({ defaultValues: {...changePasswordDefaultValues}, resolver: zodResolver(changePasswordScheme), mode: 'onBlur'});

  // Очищення форми
  const resetForm = () => {
    setPassword('')
    reset();
  }

  // Функція оновлення пароля в localStorage
  const savePassword =()=>{
    const credentials = credentialslocalStorage.get();
      if (credentials) {
        credentialslocalStorage.set({...credentials, password:password})
      }
    const credentialsSession = credentialsSessionStorage.get();
      if(credentialsSession){
        credentialsSessionStorage.set({...credentialsSession, password:password})
      }
    resetForm()
    setmodalOpen(true)
  }

  // Запит на зміну пароля
  const mutationChangePassword = useMutation({
    mutationFn:(data) => {
      return changePassword(data)
    },onSuccess: () => {
      savePassword()
    },onError:()=>{
      open('error', false)
    }})

  // Зачинення модального вікна
  const closeModal = useCallback(()=>{
    mutationChangePassword.reset()
    setmodalOpen(false)
    router.replace(cancelBtnPath)
  })

  // Управління станом кнопки Submit
  const isDisabled = () => {
    if (isError) {
      return true;
    } else 
    if (!isDirty) {
      return true;
    } else if(!isValid){
      return true
    }else return false
  }
  // Очищення поля повторити пароль
  const resetValue=()=>{
    setValue("confirmPassword",'')
  }
  
  // Функція Submit
  const onSubmit = (data) => {
    const newData={oldPassword:data.oldPassword, newPassword:data.newPassword}
    mutationChangePassword.mutate(newData)
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

          <li className={styles.tooltip}>
            <InputField
              id={"newPassword"}
              required={false}
              onInput={(e)=>{setPassword(e.target.value)}}
              maxLength={15}
              className={styles.item}
              placeholder={"Новий пароль"}
              onChange={resetValue}
              registerOptions={register("newPassword", { ...changePasswordScheme.newPassword })}
              isError={errors.newPassword}
              isValid={isValid}
              version={"password"}
              label={'Новий пароль'}
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
            onClick={()=>{router.replace(cancelBtnPath)}}
          >
            {'Скасувати'}
          </MainButton>

        </div > 
      </form>

      { mutationChangePassword.isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </>
  )
}
