"use client";
import styles from './ModalDocumentPdf.module.scss'
import { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import CloseBtn from '../../shared/CloseBtn/CloseBtn';
import LayoutModal from '../LayoutModal/LayoutModal';
import stateModalDocumentPdf from '@/src/state/stateModalDocumentPdf';
import { useBodyLock } from '@/src/lib/hooks/useBodyLock';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function ModalDocumentPdf() {
  const [numPages, setNumPages] = useState();
  //const [pageNumber, setPageNumber] = useState(0);
 // Отримуємо стан.
  const isOpen = stateModalDocumentPdf(state => state.isOpen);
  const document = stateModalDocumentPdf(state => state.document);
  const onClose = stateModalDocumentPdf(state => state.close);

  useBodyLock(isOpen);

  //


  const [width, setWidth] = useState(0);
  //const { loading, error } = dictionaries[lang].spinner;
  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }
  const pdfWrapperRef = useRef(null);

  useEffect(() => {

    const getWidth = () =>
     { pdfWrapperRef?.current?.getBoundingClientRect()?.width || 0;}

    setWidth(getWidth());

    const handleResize = () => {
      setWidth(getWidth());
    };

    if (pdfWrapperRef?.current) {
      setWidth(getWidth());
    }
    console.log(pdfWrapperRef)
    //setWidth(getWidth())
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pdfWrapperRef]);


  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  return (
    <LayoutModal isOpen={isOpen}>
      <div className={styles.wrapper} >
        <div className={styles.modal} >
          <CloseBtn className={styles.closeButton}
          onClick={onClose}/>

          <div ref={pdfWrapperRef} className={styles.wrapper_document}>
            <Document className={styles.document} 
            file={document} 
            onLoadSuccess={onDocumentLoadSuccess} 
            onError={()=>{console.log('Error')}} 
            onLoad={()=>{console.log('Load')}} >
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={width}
                  //scale={3}
                />
              ))}
            </Document>
          </div>
        </div>
      </div>
    </LayoutModal>
  );
}