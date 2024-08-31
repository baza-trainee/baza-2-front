"use client";
import styles from './ModalDocumentPdf.module.scss'
import dynamic from "next/dynamic";
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';
import { useBodyLock } from '@/src/lib/hooks/useBodyLock';
import { isMIUI} from 'react-device-detect';
import downloadPdf from '@/src/lib/hooks/downloadPdf';

const PDFViewer = dynamic(() => import("@/src/components/shared/PdfViewer/PdfViewer"), {
  ssr: false
});

export default function ModalDocumentPdf({url, hedleClose=()=>{}}) {
 // Отримуємо стан.
  const isOpen = stateModalDocumentPdf(state => state.isOpen);
  const file = stateModalDocumentPdf(state => state.document);
  const close = stateModalDocumentPdf(state => state.close);

  const onClose=()=>{
    hedleClose()
    close()
  }

  useBodyLock(isOpen);

  if(isMIUI){    
    downloadPdf(file)
    onClose()
    return null
  }

  return (
    <LayoutModal isOpen={isOpen} handleClose={onClose}>
      <div className={styles.wrapper} >
        <div className={styles.modal} >
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>
          <PDFViewer file={url ? url : file} onClose={onClose}/>
        </div>
      </div>
    </LayoutModal>
  )
}