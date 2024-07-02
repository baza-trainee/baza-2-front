"use client";

import MainButton from "@/src/components/shared/MainButton/MainButton";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export default function GlobalError({ reset }) {
  const t = useTranslations("Alert");
  return (
    <main className={styles.mainErr}>
      <p>{t('title_error')}<span> :(</span></p>
      <MainButton onClick={() => reset()}>{t('btn_home')}</MainButton>
    </main>
  );
}
