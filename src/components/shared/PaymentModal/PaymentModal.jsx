"use client";

import { Icon } from '../Icon/Icon';
import MainButton from '../MainButton/MainButton';
import { useTranslations } from "next-intl";
import styles from './PaymentModal.module.scss';
import clsx from "clsx";
import { useState } from 'react';
import { createKey } from '@/src/lib/utils/createKey';
import { btnItems } from './btnItems';

export default function PaymentModal({ handleClose }) {
  const t = useTranslations("Modal");
  const [amount, setAmount] = useState('0');

  return <div className={styles.card}>
    <p>{t('amount')} <Icon className={styles.icon} name='donate-modal-icon'/> </p>
    <button type='button' onClick={handleClose} className={styles.close_btn}><Icon name='close'/></button>
    <p className={styles.total}>{amount} <Icon name='currency'/></p>
    <ul className={styles.btns}>
      {btnItems.map((el)=>{
        return <li key={createKey()}>
          <MainButton className={clsx(amount=== el.id && styles._active)} variant='modal' onClick={()=>{setAmount(el.id)}}>{el.text}{t(el.currency)}</MainButton>
        </li>
      })}
    </ul>
    <MainButton disabled={amount==='0'}>{t('btn_support')}</MainButton>
  </div>
}