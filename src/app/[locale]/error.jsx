"use client";

import MainButton from "@/src/components/shared/MainButton/MainButton";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

export default function GlobalError({ reset }) {
  const t = useTranslations("Error");
  return (
    <main className={styles.mainErr}>
      <p>{t('title')}<span> :(</span></p>
      <MainButton onClick={() => reset()}>{t('btn_home')}</MainButton>
    </main>
  );
}
