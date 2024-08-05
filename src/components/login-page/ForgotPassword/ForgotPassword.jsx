"use client";

import { useCallback, useState } from 'react';
import stateUseAlert from '@/src/state/stateUseAlert';
import { passwordRequestReset } from '@/src/api/auth';
import { useMutation } from '@tanstack/react-query';

import { Link, useRouter } from '@/src/navigation';
import Loader from '../../shared/loader/Loader';

import UseAlert from '../../shared/UseAlert/UseAlert';
import Section from '../Section/Section';
import FormForgotPassword from './FormForgotPassword/FormForgotPassword';
import AdminModal from '../../modals/AdminModal/AdminModal';

export default function ForgotPassword() {
  const open = stateUseAlert(state => state.open);
  const router = useRouter();
  const [ modalOpen, setModalOpen ] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return passwordRequestReset(data)
    },
    onSuccess: () => {
      setModalOpen(true)
    },onError: () => {
      open('error',false)
    },
  })

  const handleClose = useCallback(()=>{
    setModalOpen(false)
    router.replace(`/admin/login`);
  })
  
  const url = `${document?.location.origin}/admin/recover-password?token=0d4edd6644700fcb2a84d2b597d3413b819cae2631acbfed424a35dac4ef260e&id=650fec0015d612e0367f5ba6`

  return (
    <Section title={'Забули пароль?'} text={'Вкажіть Вашу електронну адресу, щоб підтвердити Вашу особу'}>

      <FormForgotPassword handleMutate={mutate}/>

      {isPending && <Loader/>} 
      <AdminModal isOpen={modalOpen} handleCallback={handleClose} title={'Перевірте пошту'} text={'На вашу пошту надіслано листа для підтвердження зміни паролю'}>
        <Link href={url} target="_blank" rel="noopener">Посилання для зміни пароля</Link>
      </AdminModal>
      <UseAlert/>
    </Section>
  )
}