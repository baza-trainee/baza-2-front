"use client"
import { useTranslations } from 'next-intl';
import styles from './UseAlert.module.scss';
import clsx from 'clsx';
import CloseBtn from '../CloseBtn/CloseBtn';
import stateUseAlert from '@/src/state/stateUseAlert';
import { useEffect } from 'react';

export default function UseAlert({variant='error', message}){
  const t = useTranslations("Error");
  const isOpen = stateUseAlert(state => state.isOpen);
  const close = stateUseAlert(state => state.close);

  const styleVariant =  variant==='error'| variant==="success" ? variant :'error';

  useEffect(()=>{
    const timeoutId = setTimeout(()=>{
      close()
    },5000)
    return () => clearTimeout(timeoutId);
  },[])

  if(!isOpen){return null}

  return( 
  <div className={styles.wrapper}>
    <div className={clsx(styles.alert, styles[styleVariant])}>
      { message && variant === 'success' ? 
        <h2>{message} :)</h2> :
        <> 
          <h2>{t('title')} :(</h2>
          <p>{t('text')}</p> 
        </>
      }
      <CloseBtn className={styles.close_btn} onClick={close}/>
    </div>
  </div>)
}