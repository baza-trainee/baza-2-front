"use client";
import { useCallback } from 'react';
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

export default function PaymentModal() {
  // Мова сторінки.
  const { locale } = useParams();

  const { mutate, isPending, isError, isSuccess,reset } = useMutation({
    mutationFn: (data, locale) => {
      return PaymentService(data, localeUkToUa(locale))
    },
  })

  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);

  // контент.
  const t = useTranslations("Modal_support");

  const handleClose = useCallback(() => {
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
        
        {isError | isSuccess ?
        <MessageCard handleClose={handleClose} isError={isError} isThanks={isSuccess}/>:
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