"use client";
import styles from "./SorryModal.module.scss";
import { useTranslations } from "next-intl";
import stateSorryModal from "@/src/state/stateSorryModal";
import LayoutModal from "../LayoutModal/LayoutModal";
import CloseBtn from "../../shared/CloseBtn/CloseBtn";
import MainButton from "../../shared/MainButton/MainButton";

export default function SorryModal({ handleCallback }) {
  // контент.
  const t = useTranslations("sorryModal");
  // Отримуємо стан.
  const isOpen = stateSorryModal((state) => state.isOpen);
  const onClose = stateSorryModal((state) => state.close);

  const handleOk = () => {
    if (handleCallback) handleCallback();
    onClose();
  };

  return (
    <LayoutModal isOpen={isOpen} handleClose={handleOk}>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <CloseBtn className={styles.closeButton} onClick={handleOk} />
          <h3>{t("title")}</h3>
          <p>{t("text")}</p>

          <MainButton className={styles.btn} onClick={handleOk}>
            Oк
          </MainButton>
        </div>
      </div>
    </LayoutModal>
  );
}
