'use client';
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewRole } from '@/src/api/roles';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import SpecializationForm from '../SpecializationForm/SpecializationForm';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';

export default function AddSpecialization() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/specialization')
  })

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return createNewRole(data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

 return( 
    <SectionAdmin title={'Додати спеціалізацію'}>
      <SpecializationForm hendleMutate={mutate} isSuccess={isSuccess}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Спеціалізацію успішно додано'} btn={true}></AdminModal>

      <UseAlert/>
    </SectionAdmin>
  )
}