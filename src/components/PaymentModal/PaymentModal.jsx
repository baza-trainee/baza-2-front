"use client";

import { Icon } from '../shared/Icon/Icon';
import MainButton from '../shared/MainButton/MainButton';
import { useTranslations } from "next-intl";
import styles from './PaymentModal.module.scss';
import clsx from "clsx";
import { useState } from 'react';
import { createKey } from '@/src/lib/utils/createKey';
import { btnItems } from './btnItems';
import Modal from '../shared/Modal/Modal';
import stateModalPayment from '@/src/state/stateModalPayment';
import usePaymentHandler from './usePaymentHandler';
import { useRouter } from '@/src/navigation';
import { useParams } from 'next/navigation';

export default function PaymentModal() {
  const isOpen = stateModalPayment(state => state.isOpen);
  const close = stateModalPayment(state => state.close);

  const router = useRouter();
  const params = useParams();

  const t = useTranslations("Modal");

  const [amount, setAmount] = useState('0');
  const [thank, setThank] = useState(false);



  const submit = () => {
    console.log(usePaymentHandler(amount, params.locale))  
    setThank(true)
    setAmount('0')
  }

  const handleClose = () => {
    setAmount('0')
    close()
  }
  
  const home = () =>{
    router.push('/')
    setThank(false)
    setAmount('0')
    close()
  }

  return <Modal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.card}>

      {thank?
      <>
        <h2>{t('thanks_support')}</h2>
        <MainButton onClick={home}>{t('btn_home')}</MainButton>
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
      <button type='button' aria-label='Close modal' onClick={handleClose} className={styles.close_btn}><Icon name='close'/></button>
    </div>
  </Modal>
}