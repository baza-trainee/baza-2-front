"use client"
import styles from './CookiesModal.module.scss';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from '@/src/api/documents';
import { Icon } from '../../shared/Icon/Icon';
import MainButton from '../../shared/MainButton/MainButton';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';

// Examples Cookies:  expires: 365 днів.
// Cookies.set('name', 'value', { expires: 365 })
// Cookies.get('name') // => 'value'
// Cookies.remove('name')

export default function CookiesModal() {
  // Запит на  отримати документи
  const { data }= useQuery({ queryKey: ['documents'], queryFn: getDocuments })

  // контент.
  const t = useTranslations("cookies");

  const open = stateModalDocumentPdf(state => state.open);
  // Зберігаємо документи в глобальний стейт
  const filesUpdate = stateModalDocumentPdf(state => state.filesUpdate);
  if(data){filesUpdate(data)}

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
        onClick={()=>{open('privacyPolicy')}}
        >{t('privacy_policy')}</button> 
      </p>

      <MainButton className={styles.btn} 
        onClick={acceptCookies}>Oк</MainButton>

      <CloseBtn className={styles.close} 
        onClick={closeModal}/>
    </div>
  </div>
}