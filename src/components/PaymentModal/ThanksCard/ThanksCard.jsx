import { useTranslations } from 'next-intl';
import styles from './ThanksCard.module.scss';
import MainButton from '../../shared/MainButton/MainButton';

export default function ThanksCard({goHome}) {
  const t = useTranslations("Modal_support");

  return <div className={styles.thanks}>
    <h2>{t('thanks_support')}</h2>
    <MainButton
      onClick={goHome}>{t('btn_home')}</MainButton>
  </div>
}