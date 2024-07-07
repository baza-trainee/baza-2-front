"use client";
import styles from './ModalDocumentPdf.module.scss'
import dynamic from "next/dynamic";
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';
import { useBodyLock } from '@/src/lib/hooks/useBodyLock';

const PDFViewer = dynamic(() => import("@/src/components/shared/PdfViewer/PdfViewer"), {
  ssr: false
});

export default function ModalDocumentPdf() {
 // Отримуємо стан.
  const isOpen = stateModalDocumentPdf(state => state.isOpen);
  const file = stateModalDocumentPdf(state => state.document);
  const onClose = stateModalDocumentPdf(state => state.close);

  useBodyLock(isOpen);

  return (
    <LayoutModal isOpen={isOpen} handleClose={onClose}>
      <div className={styles.wrapper} >
        <div className={styles.modal} >
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>
          <PDFViewer file={file}/>
        </div>
      </div>
    </LayoutModal>
  )
}