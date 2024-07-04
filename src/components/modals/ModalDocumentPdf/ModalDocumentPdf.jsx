"use client";
import styles from './ModalDocumentPdf.module.scss'
import { useState } from 'react';
import dynamic from "next/dynamic";
//import { Document, Page } from 'react-pdf';
//import 'react-pdf/dist/Page/AnnotationLayer.css';
// import { pdfjs } from 'react-pdf';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';
import { useBodyLock } from '@/src/lib/hooks/useBodyLock';
//import Loader from '../../shared/loader/Loader';

const PDFViewer = dynamic(() => import("@/src/components/shared/PdfViewer/PdfViewer"), {
  ssr: false
});
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();


export default function ModalDocumentPdf() {
  //const [numPages, setNumPages] = useState();

 // Отримуємо стан.
  const isOpen = stateModalDocumentPdf(state => state.isOpen);
  const document = stateModalDocumentPdf(state => state.document);
  const onClose = stateModalDocumentPdf(state => state.close);

  useBodyLock(isOpen);

  // const [width, setWidth] = useState(0);

  // function onDocumentLoadSuccess({ numPages }){
  //   setNumPages(numPages);
  // }

  // useEffect(() => {
  //   const getWidth = () => {
  //     const windowInnerWidth = window.innerWidth
  //     if(windowInnerWidth > 1200){return 1000}
  //      else if(window.innerWidth <= 1200 && window.innerWidth > 768){return window.innerWidth - 130}else {return window.innerWidth - 40}
  //   }

  //   const handleResize = () => {
  //     setWidth(getWidth());
  //   };

  //   setWidth(getWidth());

  //   window.addEventListener('resize', handleResize);
  //   setWidth(getWidth());
 
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <LayoutModal isOpen={isOpen}>
      <div className={styles.wrapper} >
        <div className={styles.modal} >
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>
          <PDFViewer file={document}/>
          {/* <Document className={styles.document}
            loading={<Loader />}
           //error={<div className="text-3xl font-bold">{error}</div>}
            file={document} 
            onLoadSuccess={onDocumentLoadSuccess} >
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  loading=''
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className={styles.page}
                  width={width}
                />
              ))}
          </Document> */}
        </div>
      </div>
    </LayoutModal>
  )
}