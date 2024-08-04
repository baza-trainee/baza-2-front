"use client"

import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getSlideById, updateSlideById } from '@/src/api/hero-slider';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import SlideForm from '../SlideForm/SlideForm';

export default function EditSlide() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/slider')
  })

  const slideById = useQuery({ queryKey: ['slider', id], 
    queryFn:()=>{return getSlideById(id)}, keepPreviousData: true });

  const { mutate, isPending, isSuccess } = useMutation({

    mutationFn:(data) => {
      return updateSlideById(id, data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})
  
  return (
    <SectionAdmin title={'Редагувати слайд'}>
      <SlideForm hendleMutate={mutate} isSuccess={isSuccess} data={slideById.data}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </SectionAdmin>
  )
}