"use client";
import styles from "./PageNotFound.module.scss";
import { useCallback } from "react";
import { useRouter } from "@/src/navigation";
import MainButton from "../shared/MainButton/MainButton";

export const PageNotFound = ({ textErr, textErrBtn }) => {

  const router = useRouter();
  
  const handleGoHome = useCallback(() => {
    router.push('/')
  }, []); 

  return (
    <main className={styles.mainErr}>
      <h2>404</h2>
      <p>{textErr}</p>
      <MainButton
        onClick={handleGoHome}>
          {textErrBtn}
      </MainButton>
    </main>
  );
};
