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

  if (!isOpen | !type === 'mentor'| !type === 'partaker') return null;

  return (
    <LayoutModal isOpen={isOpen} handleClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()
        }>
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>

          {type === 'mentor' && <FormMentor handleClose={onClose}/>}

          {type === 'partaker' && <FormPartaker/> }  
        </div>
      </div>
    </LayoutModal>
  );
};

export default RegistrationFormModal;
