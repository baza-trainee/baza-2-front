"use client";

import MainButton from "@/src/components/shared/MainButton/MainButton";
import styles from "./page.module.scss";

export default function GlobalError({ reset }) {
  return (
    <div className={styles.mainErr}>
      <p>Something globally went wrong</p>
      <MainButton onClick={() => reset()}> Try again</MainButton>
    </div>
  );
}
