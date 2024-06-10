"use client"
import { useTranslations } from 'next-intl';
import styles from './ErrorAlert.module.scss';
import CloseBtn from '../CloseBtn/CloseBtn';
import stateErrorAlert from '@/src/state/stateErrorAlert';
import { useEffect } from 'react';

export default function ErrorAlert(){
  const t = useTranslations("Error");
  const isOpen = stateErrorAlert(state => state.isOpen);
  const close = stateErrorAlert(state => state.close);

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      close()
    },2000)
    return () => clearTimeout(timeoutId);
  },[])

  if(!isOpen){return null}

  return( 
  <div className={styles.wrapper}>
    <div className={styles.alert}>
      <h2 className={styles.error}>{t('title')} :(</h2>
      <p>{t('text')}</p>
      <CloseBtn className={styles.close_btn} onClick={close}/>
    </div>
  </div>)
}