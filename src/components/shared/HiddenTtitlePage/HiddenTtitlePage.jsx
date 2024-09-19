'use client'
import styles from './HiddenTtitlePage.module.scss'
import { useTranslations } from 'next-intl';

export default function HiddenTtitlePage({namePage}) {
  const t = useTranslations("TitlePage");
  return <h1 className={styles.visually_hidden}>{t(`title_${namePage}`)}</h1>
}