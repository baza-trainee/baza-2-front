"use client";

import LayoutModal from '../LayoutModal/LayoutModal';
import styles from './AdminModal.module.scss';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import MainButton from '../../shared/MainButton/MainButton';

export default function AdminModal({
  handleCallback=()=>{}, 
  handleOkCallback=()=>{}, 
  isOpen, 
  title, 
  text,
  children,
  btn,
  btnBlok
  }) {

  return (
    <LayoutModal isOpen={isOpen} handleClose={handleCallback}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <CloseBtn className={styles.closeButton}
          vaiant={'dark'}
          onClick={handleCallback}/>
          {title && <h3>{title}</h3>}
          {text && <p>{text}</p>}
          {children}
          {btn && <MainButton className={styles.btn} 
          onClick={handleCallback}>Oк</MainButton>}

          {btnBlok && 
            <div className={styles.btns}>
              <MainButton className={styles.btn} 
                onClick={handleOkCallback}>Видалити</MainButton>

              <MainButton variant='admin' className={styles.btn_reset} 
                onClick={handleCallback}>Скасувати</MainButton>
            </div>
          }
        </div>
      </div>
    </LayoutModal>
  )
}