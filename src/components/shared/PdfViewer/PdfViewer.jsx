"use client";
import { useEffect, useState } from "react";
import styles from './PDFViewer.module.scss';
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "../loader/Loader";
import { createKey } from "@/src/lib/utils/createKey";
import downloadPdf from "@/src/lib/hooks/downloadPdf";
import { browserName, isMobile, BrowserTypes, isMIUI} from 'react-device-detect';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function PDFViewer({file, onClose}) {

  const [pages, setPages] = useState(null);
  const [width, setWidth] = useState(0);

  function onDocumentLoadSuccess({ numPages }){
    setPages(numPages);
  }

  useEffect(() => {
    const getWidth = () => {
      const windowInnerWidth = window.innerWidth
      if(windowInnerWidth > 1200){return 1000}
       else if(window.innerWidth <= 1200 && window.innerWidth > 768){return window.innerWidth - 130}else {return window.innerWidth - 60}
    }

    const handleResize = () => {
      setWidth(getWidth());
    };

    setWidth(getWidth());

    window.addEventListener('resize', handleResize);
    setWidth(getWidth());
 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onLoadError = () => {
    downloadPdf(file)
    onClose()
  }

  if(isMobile && isMIUI){
    return (
    <div className={styles.miui_error}>
      <h3>Помилка ваш: {browserName} не підтримує перегляд PDF документів</h3>
      <button type="button" onClick={onLoadError}>Завантажити PDF документ</button>
      <p>або скористайтесь іншим браузером Chrome/Opera/Firefox</p>
    </div>
    )
  }


  return (
    <Document className={styles.document}
      loading={<Loader />}
      file={file} 
      onLoadError={(err)=>onLoadError(err)}
      onLoadSuccess={onDocumentLoadSuccess}>
        {pages && Array.from(new Array(pages), (_, index) => (
          <Page
            loading=''
            key={createKey()}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={styles.page}
            width={width}
          />
        ))}
    </Document>
  );
}
