'use client';

import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewReview } from '@/src/api/reviews';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import ReviewForm from '../ReviewForm/ReviewForm';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';

export default function AddReview() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/reviews')
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return createNewReview(data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Додати відгук'} lang={true}>
      <ReviewForm hendleMutate={mutate} isSuccess={isSuccess}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Відгук успішно додано'} btn={true}></AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}