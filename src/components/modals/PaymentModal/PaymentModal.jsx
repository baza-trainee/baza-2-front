"use client";
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import { isMobile } from 'react-device-detect';
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import MessageCard from './MessageCard/MessageCard';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import { useParams } from 'next/navigation';
import Loader from '../../shared/loader/Loader';
import { useMutation } from '@tanstack/react-query';
import { PaymentService } from '@/src/api/payment';
import { localeUkToUa } from '@/src/lib/utils/localeUkToUa';

export default function PaymentModal() {
  // Мова сторінки.
  const { locale } = useParams();

  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);
  const [ processing, setProcessing ]= useState(false)
  const [ isThanks, setIsThanks ]= useState(false)

  function thanks() {
    if(isMobile){
      setProcessing(true)
      setTimeout(()=>{
        setProcessing(false)
        setIsThanks(true)
      },3000)
    }
  }

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: (amount, locale) => {
      return PaymentService(amount, locale)
    },onSuccess:()=>{
      thanks()
    }
  })

  // контент.
  const t = useTranslations("Modal_support");

  const handleClose = useCallback(() => {
    setProcessing(false)
    setIsThanks(false)
    reset()
    close()
  })

  const handleSubmit = (amount) => {
    mutate(amount, localeUkToUa(locale))
  };

  function renderContent() {
    if(isError){
      return <MessageCard handleClose={handleClose} isError={isError}/>
    }else if(isSuccess){
      if(isMobile){
        if(processing){
          return <FormPayment handleSubmit={handleSubmit}/>
        }
        if(isThanks){
          return <MessageCard handleClose={handleClose} isThanks={isThanks}/>
        }
      }else return <MessageCard handleClose={handleClose} isThanks={isSuccess}/>
    }
    else return <FormPayment handleSubmit={handleSubmit}/>
  }



  return <LayoutModal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {isPending && <Loader/>}
        {processing && <Loader/>}
        { renderContent() }

        <CloseBtn className={styles.close_btn}
          ariaLabel={ isSuccess ? 
            t('ariaLabel_btn_close_2') : 
            t('ariaLabel_btn_close_1')
          }
          onClick={handleClose}/>
      </div>
    </div>
  </LayoutModal>
}