"use client";
import { useState } from 'react';
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import Modal from '../shared/Modal/Modal';
import stateModalPayment from '@/src/state/stateModalPayment';
import usePaymentHandler from './usePaymentHandler';
import styles from './PaymentModal.module.scss';
import CloseBtn from '../shared/CloseBtn/CloseBtn';
import ThanksCard from './ThanksCard/ThanksCard';
import DonateForm from './DonateForm/DonateForm';

export default function PaymentModal() {
  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);
  // router.
  const router = useRouter();
  const { locale } = useParams();
  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
    const [amount, setAmount] = useState('0');
   const [thank, setThank] = useState(false);

  const submit = () => {
    console.log(usePaymentHandler(amount, locale))  
    setThank(true)
    setAmount('0')
  }

  const handleClose = () => {
    setThank(false)
    setAmount('0')
    close()
  }
  
  const goHome = () => {
    router.push('/')
    handleClose()
  }

  return <Modal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {thank?
        <ThanksCard goHome={goHome}/>:
        <DonateForm amount={amount} setAmount={setAmount} submit={submit}/>
        }
        <CloseBtn ariaLabel={ thank ? 
            t('ariaLabel_btn_close_2') : 
            t('ariaLabel_btn_close_1')
          }
          onClick={handleClose} 
          className={styles.close_btn}
        />
      </div>
    </div>
  </Modal>
}