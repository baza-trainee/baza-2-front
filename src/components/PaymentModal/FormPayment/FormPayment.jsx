//"use client";
import { useRef, useState } from 'react';
import { useTranslations } from "next-intl";
import { Icon } from "../../shared/Icon/Icon";
import { btnItems } from "../btnItems";
import { createKey } from "@/src/lib/utils/createKey";
import MainButton from "../../shared/MainButton/MainButton";
import styles from './FormPayment.module.scss';
import clsx from "clsx";
import usePaymentHandler from '../usePaymentHandler';
import { useParams } from 'next/navigation';

export default function FormPayment({handleThank}) {
  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
  const [amount, setAmount] = useState('0');
  const [readOnly, setReadOnly] = useState(true);
  
  const { locale } = useParams();
  const inputRef = useRef(null);

  const isDisabled =(amount)=>{
    return amount === ''|| amount === '0'
  }

  const onSubmit = (amount) => {
    if(isDisabled(amount)) {
      console.log('Не обрана сума')
      return
    }
    console.log(usePaymentHandler(amount, locale)) 
    handleThank()
  };

  const another = () => {
    if(readOnly){
      setReadOnly(false)
      setAmount('')
    }
 
    if(inputRef && inputRef.current){
      inputRef.current.focus()
    }
  }

  const fixedAmount = (ev, id) => {
    const { value } = ev.target;
    if (isDisabled(value) && !id) {
      setReadOnly(true);
      setAmount('0');
    } else if (ev.target && id) {
      setReadOnly(true);
      setAmount(id);
    } else {
      ev.preventDefault();
    }
  };
  
  const isValidate = (value) => {
   if(/^[1-9]\d{0,3}$|^$/.test(value)){
    setAmount(value.trim())
   }
  }

  const activeStyle = id => (readOnly && amount === id) || (!readOnly && id === 'another');


  return <form className={styles.form} onSubmit={(e)=>{
    e.preventDefault()
    onSubmit(amount)
    }}>
    <p>{t('amount')} <Icon className={styles.icon} name='donate-modal-icon'/></p>
    <div className={clsx(styles.amount, amount.length >1 && !readOnly && styles._active)}>
      <input 
        id='amount'
        value={amount} 
        type = "text"
        className={styles.input}
        ref={inputRef}
        size={ amount.length < 1 ? 1 : amount.length } 
        onInput={(e)=>{isValidate(e.target.value)}}
        onBlur={(e)=>{fixedAmount(e)}}
        readOnly={readOnly}
        autoComplete="off"
        />
      <label htmlFor='amount'><Icon name='currency'/></label>
    </div>

    <ul className={styles.btns}>
      {btnItems.map((el)=>{
        return <li key={createKey()}>
          <MainButton className={clsx(styles.btn, activeStyle(el.id) && styles._active,el.id === '500'&& styles._hide)} variant='modal' 
          onClick={(ev)=>{
            'another' === el.id ?
            another():
            fixedAmount(ev, el.id)
            }}>{el.text}{t(el.currency)}</MainButton>
        </li>
      })}
    </ul>

    <MainButton className={styles.btn_submit} type="submit" disabled={isDisabled(amount)}>{t('btn_support')}</MainButton>
  </form>
}