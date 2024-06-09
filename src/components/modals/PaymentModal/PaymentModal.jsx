"use client";
import { useCallback, useState } from 'react';
import { useTranslations } from "next-intl";
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalPayment from '@/src/state/stateModalPayment';
import styles from './PaymentModal.module.scss';
import FormPayment from './FormPayment/FormPayment';
import MessageCard from './MessageCard/MessageCard';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import { useParams } from 'next/navigation';
import handlePayment from '@/src/lib/services/handlePayment';
import Loader from '../../shared/loader/Loader';

export default function PaymentModal() {
  // Мова сторінки.
  const { locale } = useParams();

  // Отримуємо стан.
  const isOpen = stateModalPayment(state => state.isOpen);
  const isThanks = stateModalPayment(state => state.isThanks);
  const addThanks = stateModalPayment(state => state.addThanks);
  const close = stateModalPayment(state => state.close);

  // контент.
  const t = useTranslations("Modal_support");
  // локальний стан.
  //const [thank, setThank] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(()=>{
  //   return ()=>{
  //     if(thank){
  //       addThanks()
  //     }
  //   }
  // })

  const handleClose = useCallback(() => {
    //setThank(false)
    close()
  },[])

  // const handleThank = useCallback(() => {
  //   setThank(true)
  // }, [thank]);

  const handleThank = (res) => {
    console.log(res)
    if(res.data){
      window.location.href = res.data.invoiceUrl;
      setTimeout(()=>{
        //setIsLoader(false)
        //setThank(true)
        addThanks()
      },700)
 
    }else {setIsLoader(false)}

    if(res.error){
      console.log(res)
      setIsError(true)
      setIsLoader(false)
    } 
    //setIsLoader(false)
  };


  const handleSubmit = (amount) => {
    handlePayment(amount, locale, handleThank)
    setIsLoader(true)
    //setThank(true)
  };


  return <LayoutModal isOpen={isOpen} handleClose={handleClose}>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {isLoader && <Loader/>}
        
        {isError | isThanks ?
        <MessageCard handleClose={handleClose} isError={isError}/>:
        <FormPayment handleSubmit={handleSubmit}/>
        }

        <CloseBtn className={styles.close_btn}
          ariaLabel={ isThanks ? 
            t('ariaLabel_btn_close_2') : 
            t('ariaLabel_btn_close_1')
          }
          onClick={handleClose}/>
      </div>
    </div>
  </LayoutModal>
}