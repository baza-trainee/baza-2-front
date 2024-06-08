"use client";
import { useCallback, useState } from 'react';
import { useTranslations } from "next-intl";
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import MessageCard from './MessageCard/MessageCard';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';

export default function PaymentModal() {
  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);

  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
  const [thank, setThank] = useState(false);
  const [isLoader, setIsLoader] = useState(false);


  const handleClose = useCallback(() => {
    setThank(false)
    close()
  },[thank])

  const handleThank = useCallback(() => {
    setThank(true)
  }, [thank]);

  return <LayoutModal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {thank?
        <MessageCard handleClose={handleClose}/>:
        <FormPayment handleThank={handleThank}/>
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