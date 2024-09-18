'use client'
import styles from './HiddenTtitlePage.module.scss'
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function HiddenTtitlePage({namePage}) {
  const t = useTranslations("TitlePage");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(()=>{
    scrollToTop()
  },[])

  return <h1 className={styles.visually_hidden}>{t(`title_${namePage}`)}</h1>
}