"use client";
import styles from "./RegistrationFormModal.module.scss";
// import clsx from "clsx";
import stateRegistrationFormModal from "@/src/state/stateRegistrationFormModal";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";
import CloseBtn from "../../shared/CloseBtn/CloseBtn";
import LayoutModal from "../LayoutModal/LayoutModal";
import FormMentor from "./FormMentor/FormMentor";
import FormPartaker from "./FormPartaker/FormPartaker";

const RegistrationFormModal=()=>{
  // Отримуємо стан.
  const isOpen = stateRegistrationFormModal(state => state.isOpen);
  const type = stateRegistrationFormModal(state => state.type);

  const onClose = stateRegistrationFormModal(state => state.close);

  useBodyLock(isOpen);

  if (!isOpen) return null;

  return (
    <LayoutModal isOpen handleClose={onClose}>
      <div className={styles.wrapper} onClick={(e) => {
        onClose()
        e.stopPropagation()
        }}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()
        }>
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>

          {type === 'mentor' && <FormMentor/>}

          {type === 'partaker' && <FormPartaker/> }  
        </div>
      </div>
    </LayoutModal>
  );
};

export default RegistrationFormModal;
