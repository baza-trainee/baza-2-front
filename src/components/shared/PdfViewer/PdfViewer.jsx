"use client";
import { useEffect, useState } from "react";
import styles from './PDFViewer.module.scss';
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "../loader/Loader";
import { createKey } from "@/src/lib/utils/createKey";
import downloadPdf from "@/src/lib/hooks/downloadPdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

  return (
    <Document className={styles.document}
      loading={<Loader />}
      file={file} 
      onLoadError={(err)=>onLoadError(err)}
      onError={onLoadError}
      onLoadSuccess={onDocumentLoadSuccess}>
      
        {pages && Array.from(new Array(pages), (_, index) => (
          <Page
            loading=''
            onError={onLoadError}
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
