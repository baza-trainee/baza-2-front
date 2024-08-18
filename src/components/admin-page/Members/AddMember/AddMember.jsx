//AddMember
'use client';
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewMember } from '@/src/api/members';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import MemberForm from '../MemberForm/MemberForm';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';

export default function AddMember() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/members')
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return createNewMember(data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


 return( 
    <SectionAdmin title={'Додати учасника'} lang={true}>
      <MemberForm hendleMutate={mutate} isSuccess={isSuccess}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Учасника успішно додано'} btn={true}></AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}