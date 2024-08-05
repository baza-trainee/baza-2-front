"use client"

import styles from './EditPartner.module.scss'
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
import PartnerPreview from '../PartnerPreview/PartnerPreview';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPartnerById, updatePartnerById } from '@/src/api/partners';
import PartnerForm from '../PartnerForm/PartnerForm';
import stateUseAlert from '@/src/state/stateUseAlert';

export default function EditPartner() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  const[ prevImg, setPrevImg ] = useState(null);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/partners')
  })

  const partnerById = useQuery({ queryKey: ['partner', id], 
    queryFn:()=>{return getPartnerById(id)}, keepPreviousData: true });

  const { mutate, isPending, isSuccess } = useMutation({

    mutationFn:(data) => {
      return updatePartnerById(id, data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})
  
  return (
    <SectionAdmin title={'Редагувати партнера'}>
      <div className={styles.wrapper}>
        <PartnerForm hendleMutate={mutate} isSuccess={isSuccess} handlePrevImg={setPrevImg} data={partnerById.data} submitBtnText='Зберегти зміни' />

        <PartnerPreview imageUrl={prevImg}/>
      </div>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>

    </SectionAdmin>
  )
}