"use client"
import { useTranslations } from 'next-intl';
import { Icon } from '../shared/Icon/Icon';
import MainButton from '../shared/MainButton/MainButton';
import styles from './Cookies.module.scss';
//import { Link } from '@/src/navigation';
import CloseBtn from '../shared/CloseBtn/CloseBtn';
import { useState } from 'react';

export default function Cookies() {
  // контент.
  const t = useTranslations("cookies");
// локальний стан.;           

  const [isOpen, setIsOpen] = useState(true);

  if(!isOpen){return null}

  return <div className={styles.wrapper}>
    <div className={styles.modal}>
      <h3 className={styles.title}>Cookies<Icon name={"cookies"}/></h3>
      {/* <p className={styles.text}>{t("text")} <Link href='/' className={styles.lick}>{t("privacy_policy")}</Link></p> */}
      <p className={styles.text}>{t("text")}  <a
        className={styles.lick}
        href={'/'}
        target="_blank"
        rel="noreferrer noopener"
        >{t('privacy_policy')}</a>
      </p>
      <MainButton className={styles.btn} 
        onClick={()=>{setIsOpen(false)}}>Ok</MainButton>

        <CloseBtn className={styles.close} 
        onClick={()=>{setIsOpen(false)}}/>
    </div>
  </div>
}