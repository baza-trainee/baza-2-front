import { useTranslations } from 'next-intl';
import styles from './DonateForm.module.scss';
import clsx from "clsx";
import MainButton from '../../shared/MainButton/MainButton';
import { createKey } from '@/src/lib/utils/createKey';
import { btnItems } from '../btnItems';
import { Icon } from '../../shared/Icon/Icon';

export default function DonateForm({amount,setAmount,submit}) {
  const t = useTranslations("Modal_support");
 
  return <div className={styles.form}>
    <p>{t('amount')} <Icon className={styles.icon} name='donate-modal-icon'/> </p>
    <p className={styles.total}>{amount} <Icon name='currency'/></p>
    <ul className={styles.btns}>
      {btnItems.map((el)=>{
        return <li key={createKey()}>
          <MainButton className={clsx(styles.btn, amount === el.id && styles._active)} variant='modal' 
          onClick={()=>{
            'another' === el.id?
            submit():
            setAmount(el.id)
            }}>{el.text}{t(el.currency)}</MainButton>
        </li>
      })}
    </ul>
    <MainButton disabled={amount==='0'} onClick={submit}>{t('btn_support')}</MainButton>
  </div>
  
}