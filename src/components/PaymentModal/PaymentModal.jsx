"use client";
import { useCallback, useState } from 'react';
import { useTranslations } from "next-intl";
import { useRouter } from '@/src/navigation';
import Modal from '../shared/Modal/Modal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import ThanksCard from './ThanksCard/ThanksCard';
import CloseBtn from '../shared/CloseBtn/CloseBtn';

export default function PaymentModal() {
  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);
  // Router.
  const router = useRouter();
  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.;
  const [thank, setThank] = useState(false);

  const handleClose = () => {
    setThank(false)
    close()
  }

  const handleGoHome = useCallback(() => {
    router.push('/')
    setThank(false)
    handleClose()
  }, [thank]);

  const handleThank = useCallback(() => {
    setThank(true)
  }, [thank]);

  return <Modal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.card}>
      {thank?
      <ThanksCard goHome={handleGoHome}/>:
      <FormPayment handleThank={handleThank}/>
      }

      <CloseBtn ariaLabel={ thank ? 
          t('ariaLabel_btn_close_2') : 
          t('ariaLabel_btn_close_1')
        }
        onClick={handleClose} 
        className={styles.close_btn}
      />
    </div>
  </Modal>
}