"use client";
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useBodyLock } from "@/src/lib/hooks/useBodyLock";
import styles from "./Modal.module.scss";

const Modal = ({ children, isOpen, handleClose }) => {
  const closeOnEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeOnEscape]);

  console.log(isOpen);

  useBodyLock(isOpen);

  if (!isOpen) return null;

  return createPortal(<div data-lenis-prevent className={styles.modalOverlay}>{children}</div>, document.body
  );
};

export default Modal;
