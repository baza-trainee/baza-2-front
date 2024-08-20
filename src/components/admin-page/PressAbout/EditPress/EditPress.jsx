"use client"

import styles from './EditPress.module.scss'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import SectionAdmin from '../../SectionAdmin/SectionAdmin';
// import PressPrewiev from '../PressPrewiev/PressPrewiev';
import Loader from '@/src/components/shared/loader/Loader';
import AdminModal from '@/src/components/modals/AdminModal/AdminModal';
import UseAlert from '@/src/components/shared/UseAlert/UseAlert';
import { useMutation, useQuery } from '@tanstack/react-query';
import PressForm from '../PressForm/PressForm';
import stateUseAlert from '@/src/state/stateUseAlert';
import { items } from '@/src/components/main-page/ArticlesSection/items';
//import {items} from '../../main-page/ArticlesSection/items';


export default function EditPress() {
  const router = useRouter();
  const {id}= useParams()
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setmodalOpen ] = useState(false);
  const[ prevImg, setPrevImg ] = useState(null);
  
  const closeModal = useCallback(()=>{
    setmodalOpen(false)
    router.replace('/admin/press')
  })

//тимчасовий
  const pressById = items.find(item => item.id === parseInt(id));
  useEffect(() => {
    console.log('Press Data:', pressById);
  }, [pressById]);

  const { mutate, isPending, isSuccess } = useMutation({

    mutationFn:(data) => {
      return pressById(id, data)

    },onSuccess: () => {
      setmodalOpen(true)
    },onError:()=>{
      open('error', false)
    }})
  
  return (
    <SectionAdmin title={'Редагувати статтю'}>
      <div className={styles.wrapper}>
        <PressForm hendleMutate={mutate} isSuccess={isSuccess} data={pressById} submitBtnText='Зберегти зміни' />
        
      </div>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Дані успішно збережено'} btn={true}></AdminModal>
      <UseAlert/>

    </SectionAdmin>
  )
}