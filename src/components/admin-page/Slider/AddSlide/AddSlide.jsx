'use client';
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewSlide } from '@/src/api/hero-slider';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import SlideForm from '../SlideForm/SlideForm'
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';

export default function AddSlide() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/slider')
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return createNewSlide(data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

 return( 
    <SectionAdmin title={'Додати слайд'} lang={true}>
      <SlideForm 
        hendleMutate={mutate} 
        isSuccess={isSuccess}/>

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Слайд успішно додано'} 
        btn={true}>
      </AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}