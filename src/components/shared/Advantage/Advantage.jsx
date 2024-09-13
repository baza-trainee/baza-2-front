"use client";

import Image from "next/image";
import styles from "./Advantage.module.scss";
import { useTranslations } from "next-intl";

const Advantage = ({ img, text }) => {
  const t = useTranslations("Internship.benefits_internship.cards");
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={img} sizes="100%" fill alt={t(text)} />
      </div>
      <p className={styles.text}>{t(text)}</p>
    </div>
  );
};

export default Advantage;
