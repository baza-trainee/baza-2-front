"use client";
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import MessageCard from './MessageCard/MessageCard';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import { useParams } from 'next/navigation';
import handlerPayment from '@/src/services/handlerPayment';
import Loader from '../../shared/loader/Loader';

export default function PaymentModal() {
  // Мова сторінки.
  const { locale } = useParams();

  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);

  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
  const [success, setІuccess] = useState(false);
  const [thank, setThank] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    if(!success){return}
    const timeoutId = setTimeout(()=>{
      setIsLoader(false)
      setThank(true)
    },1000)
    return () => clearTimeout(timeoutId);
  },[success])

  const handleClose = useCallback(() => {
    setIsError(false)
    setIsLoader(false)
    setThank(false)
    setІuccess(false)
    close()
  },[])

  const handleResponse = (res) => {
    if(res==='ok'){
      setІuccess(true)
    }

    if(res==='error'){
      setIsLoader(false)
      setIsError(true)
    } 
  };

  const handleSubmit = (amount) => {
    handlerPayment(amount, locale, handleResponse)
    setIsLoader(true)
  };

  return <LayoutModal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {isLoader && <Loader/>}
        
        {isError | thank ?
        <MessageCard handleClose={handleClose} isError={isError} isThanks={thank}/>:
        <FormPayment handleSubmit={handleSubmit}/>
        }

        <CloseBtn className={styles.close_btn}
          ariaLabel={ thank ? 
            t('ariaLabel_btn_close_2') : 
            t('ariaLabel_btn_close_1')
          }
          onClick={handleClose}/>
      </div>
    </div>
  </LayoutModal>
}