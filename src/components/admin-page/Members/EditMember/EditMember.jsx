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

  const { mutate, isPending, isSuccess } = useMutation({

    mutationFn:(data) => {
      return updateMemberById(id, data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

    const onSubmit = (data) => {
      const newData = {
        name: {
          en: data.name_en,
          pl: data.name_pl,
          ua: data.name_ua,
        },
        profileUrl: data.profileUrl,
      }
      console.log(newData)
      mutate(newData)
    };

  console.log(memberById.data)
  return (
    <SectionAdmin title={'Редагувати учасника'}>
      <MemberForm hendleMutate={mutate} isSuccess={isSuccess} data={memberById.data} submitBtnText='Зберегти зміни'/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </SectionAdmin>
  )
}