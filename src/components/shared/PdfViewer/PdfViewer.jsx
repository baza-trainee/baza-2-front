"use client";
import { useEffect, useState } from "react";
import styles from './PDFViewer.module.scss';
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "../loader/Loader";
import { createKey } from "@/src/lib/utils/createKey";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
//import workerSrc from "../pdf-worker";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
//pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({file="/documents/privacy_policy.pdf"}) {
    //const [file, setFile] = useState("/documents/privacy_policy.pdf");

  // const [file, setFile] = useState("/documents/privacy_policy.pdf");
   const [numPages, setNumPages] = useState(null);

  // function onFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // function onDocumentLoadSuccess({ numPages: nextNumPages }) {
  //   setNumPages(nextNumPages);
  // }
  const [width, setWidth] = useState(0);

  function onDocumentLoadSuccess({ numPages }){
    setNumPages(numPages);
  }

  useEffect(() => {
    const getWidth = () => {
      const windowInnerWidth = window.innerWidth
      if(windowInnerWidth > 1200){return 1000}
       else if(window.innerWidth <= 1200 && window.innerWidth > 768){return window.innerWidth - 130}else {return window.innerWidth - 40}
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

  return (

    <Document className={styles.document}
      loading={<Loader />}
    //error={<div className="text-3xl font-bold">{error}</div>}
      file={file} 
      onLoadSuccess={onDocumentLoadSuccess} >
        {Array.from(new Array(numPages), (_, index) => (
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
