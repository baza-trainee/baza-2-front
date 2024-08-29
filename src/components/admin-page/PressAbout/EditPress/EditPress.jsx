"use client"
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getArticleById, updateArticleById } from '@/src/api/articles';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import PressForm from '../PressForm/PressForm';
import stateUseAlert from '@/src/state/stateUseAlert';

export default function EditPress() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/press-about')
  })

  // Запит на отримання статті по id
  const { data } = useQuery({ queryKey: ['article', id], 
    queryFn:()=>{return getArticleById(id)},
    onError:()=>{
      open('error', false)
    }})

 // Запит на редагування статті
  const { mutate, isPending } = useMutation({
    mutationFn:(data) => {
      return updateArticleById(id, data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})
  
  return (
    <SectionAdmin title={'Редагувати статтю'}>

      <PressForm 
        hendleMutate={mutate} 
        data={data} 
        submitBtnText='Зберегти зміни' />

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Дані успішно збережено'} 
        btn={true}>
      </AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}