import { useTranslations } from 'next-intl';
import styles from './ThanksCard.module.scss';
import ButtonLink from '../../shared/ButtonLink/ButtonLink';

export default function ThanksCard({handleClose}) {
  const t = useTranslations("Modal_support");

  return <div className={styles.thanks}>
    <h2>{t('thanks_support')}</h2>

    <ButtonLink url='/' onClick={handleClose}>
      {t('btn_home')}
    </ButtonLink>
  </div>
}