"use client"
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Icon } from '../../shared/Icon/Icon';
import MainButton from '../../shared/MainButton/MainButton';
import styles from './CookiesModal.module.scss';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import downloadPdf from '@/src/lib/hooks/downloadPdf';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';

// Examples Cookies:  expires: 365 днів.
// Cookies.set('name', 'value', { expires: 365 })
// Cookies.get('name') // => 'value'
// Cookies.remove('name')

export default function CookiesModal() {
  // контент.
  const t = useTranslations("cookies");

  const open = stateModalDocumentPdf(state => state.open);
  // локальний стан.          
  const [showModal, setShowModal] = useState(false);
  // перевіряємо чи cookiesAccepted.
  useEffect(() => {
    if (!Cookies.get('cookiesAccepted')) {
      setShowModal(true);
    }
  }, []);
  // зберігаємо cookiesAccepted зі значенням true.
  const acceptCookies = () => {
    Cookies.set('cookiesAccepted', 'true', {
      expires: 1 / 48,
    });
    //Cookies.remove('cookiesAccepted')
    setShowModal(false);
  };

  const closeModal=()=>{
    setShowModal(false)
  };

  if(!showModal){return null};

  return <div className={styles.wrapper}>
    <div className={styles.modal}>
      <h3 className={styles.title}>Cookies<Icon name={"cookies"}/></h3>

      <p className={styles.text}>{t("text")}  <button
        type="button"
        className={styles.linck}
        onClick={()=>{open('/documents/privacy_policy.pdf')}}
        >{t('privacy_policy')}</button> 
      </p>

      <MainButton className={styles.btn} 
        onClick={acceptCookies}>Oк</MainButton>

      <CloseBtn className={styles.close} 
        onClick={closeModal}/>
    </div>
  </div>
}