'use client';
import styles from './AddPartner.module.scss'
import { useCallback, useState } from 'react';
import { useRouter } from '@/src/navigation';
import { useMutation } from '@tanstack/react-query';
import { createNewPartner } from '@/src/api/partners';
import SectionAdmin from '../../SectionAdmin/SectionAdmin'
import stateUseAlert from '@/src/state/stateUseAlert';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import PartnerForm from '../PartnerForm/PartnerForm';
import PartnerPreview from '../PartnerPreview/PartnerPreview';

export default function AddPartner() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  const[ prevImg, setPrevImg ] = useState(null);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/partners')
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return createNewPartner(data)
    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

  return (
    <SectionAdmin title={'Додати партнерів'}>
      <div className={styles.wrapper}>
        <PartnerForm hendleMutate={mutate} handlePrevImg={setPrevImg}/>

        <PartnerPreview imageUrl={prevImg}/>
      </div>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Партнера успішно додано'} btn={true}></AdminModal>
      <UseAlert text={error && error.message}/>

    </SectionAdmin>
  )
}