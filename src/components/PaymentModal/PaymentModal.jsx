"use client";
import { useState } from 'react';
import { useTranslations } from "next-intl";
import { useParams } from 'next/navigation';
import { useRouter } from '@/src/navigation';
import { createKey } from '@/src/lib/utils/createKey';
import { Icon } from '../shared/Icon/Icon';
import MainButton from '../shared/MainButton/MainButton';
import Modal from '../shared/Modal/Modal';
import stateModalPayment from '@/src/state/stateModalPayment';
import usePaymentHandler from './usePaymentHandler';
import { btnItems } from './btnItems';
import styles from './PaymentModal.module.scss';
import clsx from "clsx";

export default function PaymentModal() {
  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);
  // контент.
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
    <div className={styles.card}>
      {thank?
      <>
        <h2>{t('thanks_support')}</h2>
        <MainButton onClick={goHome}>{t('btn_home')}</MainButton>
      </>:
      <>
        <p>{t('amount')} <Icon className={styles.icon} name='donate-modal-icon'/> </p>
        <p className={styles.total}>{amount} <Icon name='currency'/></p>
        <ul className={styles.btns}>
          {btnItems.map((el)=>{
            return <li key={createKey()}>
              <MainButton className={clsx(amount === el.id && styles._active)} variant='modal' 
              onClick={()=>{
                'another' === el.id?
                submit():
                setAmount(el.id)
                }}>{el.text}{t(el.currency)}</MainButton>
            </li>
          })}
        </ul>
        <MainButton disabled={amount==='0'} onClick={submit}>{t('btn_support')}</MainButton>
      </>
      }

      <button type='button' 
        aria-label={thank ? 
          t('ariaLabel_btn_close_2') : 
          t('ariaLabel_btn_close_1')} 
        onClick={handleClose} 
        className={styles.close_btn}><Icon name='close'/>
      </button>
    </div>
  </Modal>
}