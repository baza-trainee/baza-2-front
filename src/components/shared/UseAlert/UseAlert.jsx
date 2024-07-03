"use client"
import { useTranslations } from 'next-intl';
import styles from './UseAlert.module.scss';
import clsx from 'clsx';
import CloseBtn from '../CloseBtn/CloseBtn';
import stateUseAlert from '@/src/state/stateUseAlert';
import { useEffect } from 'react';
import { createPortal } from "react-dom";

export default function UseAlert(){
  const t = useTranslations("Alert");
  const isOpen = stateUseAlert(state => state.isOpen);
  const type = stateUseAlert(state => state.type);
  const autoClose = stateUseAlert(state => state.autoClose);
  const close = stateUseAlert(state => state.close);

  useEffect(()=>{
    if(isOpen && autoClose){
      const timeoutId = setTimeout(()=>{
        close()
      },5000)
      return () => clearTimeout(timeoutId);
    }
  },[isOpen, autoClose])

  if(!isOpen){return null}

  return createPortal(
    <div className={styles.wrapper}>
    <div className={clsx(styles.alert, styles[type])}>
      { type === 'error' ? 
        <>
          <h2>{t(`title_${type}`)}</h2> 
          <p>{t('text')}</p> 
        </>:

        <h2>{t(`title_${type}`)}</h2>
      }
      <CloseBtn className={styles.close_btn} onClick={close}/>
    </div>
  </div>, document.body
  );
}