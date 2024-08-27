"use client";
import stateSorryModal from "@/src/state/stateSorryModal";
import LayoutModal from "../LayoutModal/LayoutModal";
import styles from "./SorryModal.module.scss";
import CloseBtn from "../../shared/CloseBtn/CloseBtn";
import MainButton from "../../shared/MainButton/MainButton";
import { useTranslations } from "next-intl";

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
      <div
        className={styles.wrapper}
        onClick={(e) => {
          handleOk();
          e.stopPropagation();
        }}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
