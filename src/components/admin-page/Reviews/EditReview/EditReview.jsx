"use client"

import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import ReviewForm from '../ReviewForm/ReviewForm';
import { getReviewById, updateReviewById } from '@/src/api/reviews';

export default function EditReview() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/reviews')
  })

  const reviewById = useQuery({ queryKey: ['review', id], 
    queryFn:()=>{return getReviewById(id)}, keepPreviousData: true });

  const { mutate, isPending, isSuccess } = useMutation({

    mutationFn:(data) => {
      return updateReviewById(id, data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})
  
  return (
    <SectionAdmin title={'Редагувати відгук'}>
      <ReviewForm hendleMutate={mutate} isSuccess={isSuccess} data={reviewById.data}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </SectionAdmin>
  )
}