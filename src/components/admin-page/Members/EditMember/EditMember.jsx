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
import MemberForm from '../MemberForm/MemberForm';
import { getMemberById, updateMemberById } from '@/src/api/members';

export default function EditMember() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/members')
  })

  const memberById = useQuery({ queryKey: ['member', id], 
    queryFn:()=>{return getMemberById(id)}, keepPreviousData: true });

  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return updateMemberById(id, data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

  return (
    <SectionAdmin title={'Редагувати учасника'}>
      <MemberForm hendleMutate={mutate} data={memberById.data} submitBtnText='Зберегти зміни'/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert text={error && error.message}/>
    </SectionAdmin>
  )
}