"use client"
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRoleById, updateRoleById } from '@/src/api/roles';
import stateUseAlert from '@/src/state/stateUseAlert';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import SpecializationForm from '../SpecializationForm/SpecializationForm';

export default function EditSpecialization() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/specialization')
  })

  const roleById = useQuery({ queryKey: ['specialization', id], 
    queryFn:()=>{return getRoleById(id)}, keepPreviousData: true });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn:(data) => {
      return updateRoleById(id, data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

  return (
    <SectionAdmin title={'Редагувати спеціалізацію'}>
      <SpecializationForm hendleMutate={mutate} isSuccess={isSuccess} data={roleById.data} submitBtnText='Зберегти зміни'/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>
    </SectionAdmin>
  )
}