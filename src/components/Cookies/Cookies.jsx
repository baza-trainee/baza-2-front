"use client"
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Icon } from '../shared/Icon/Icon';
import MainButton from '../shared/MainButton/MainButton';
import styles from './Cookies.module.scss';
import CloseBtn from '../shared/CloseBtn/CloseBtn';

export default function Cookies() {
  // контент.
  const t = useTranslations("cookies");
// локальний стан.;           
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // if (!Cookies.get('cookiesAccepted')) {
    //   setShowModal(true);
    // }
  }, []);

  const acceptCookies = () => {
    // Cookies.set('cookiesAccepted', 'true', {
    //   expires: 1 / 48,
    // });
    //setCookie();
    setShowModal(false);
  };

  if(!showModal){return null}

  return <div className={styles.wrapper}>
    <div className={styles.modal}>
      <h3 className={styles.title}>Cookies<Icon name={"cookies"}/></h3>

      <p className={styles.text}>{t("text")}  <a
        className={styles.lick}
        href={'/'}
        target="_blank"
        rel="noreferrer noopener"
        >{t('privacy_policy')}</a>
      </p>
      <MainButton className={styles.btn} 
        onClick={()=>{acceptCookies(false)}}>Ok</MainButton>

        <CloseBtn className={styles.close} 
        onClick={()=>{setShowModal(false)}}/>
    </div>
  </div>
}