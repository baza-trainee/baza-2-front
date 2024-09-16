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
import Loader from '../../shared/loader/Loader';
import { useMutation } from '@tanstack/react-query';
import { PaymentService } from '@/src/api/payment';
import { localeUkToUa } from '@/src/lib/utils/localeUkToUa';
import { isMobile } from 'react-device-detect';

export default function PaymentModal() {
  // Мова сторінки.
  const { locale } = useParams();

  const { mutate, isPending, isError, isSuccess, reset } = useMutation({
    mutationFn: (data, locale) => {
      return PaymentService(data, localeUkToUa(locale))
    },
    onSuccess:()=>{
      //isMobile && close()
      close()
      sessionStorage.setItem('isThanks', true)
    }
  })

  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);
  const [ isThanks, setIsThanks ] = useState(false)

  useEffect(()=>{
    const isThanks = sessionStorage.getItem('isThanks');
    if(isThanks){
      setIsThanks(true)
      open()
    }
  })

  // контент.
  const t = useTranslations("Modal_support");

  const handleClose = useCallback(() => {
    setIsThanks(false)
    sessionStorage.removeItem('isThanks')
    setIsThanks(false)
    sessionStorage.removeItem('isThanks')
    reset()
    close()
  })

  const handleSubmit = (amount) => {
    mutate(amount, locale)
  };

  return <LayoutModal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {isPending && <Loader/>}
        
        {isError | isSuccess | isThanks ?
        <MessageCard handleClose={handleClose} isError={isError} isThanks={isSuccess | isThanks}/>:
        <FormPayment handleSubmit={handleSubmit}/>
        }

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