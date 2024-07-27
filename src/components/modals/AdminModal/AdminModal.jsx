"use client";

import LayoutModal from '../LayoutModal/LayoutModal';
import styles from './AdminModal.module.scss';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import MainButton from '../../shared/MainButton/MainButton';

export default function AdminModal(
  {handleCallback=()=>{}, 
  isOpen, 
  title, 
  text,
  children,
  btn}) {

  return (
    <LayoutModal isOpen={isOpen} handleClose={handleCallback}>
      <div className={styles.wrapper} onClick={(e) => {
        handleCallback()
        e.stopPropagation()
        }}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()
        }>
          <CloseBtn className={styles.closeButton}
          vaiant={'dark'}
          onClick={handleCallback}/>
          {title && <h3>{title}</h3>}
          {text && <p>{text}</p>}
          {children}
          {btn && <MainButton className={styles.btn} 
          onClick={handleCallback}>Oк</MainButton>}
        </div>
      </div>
    </LayoutModal>
  )
}