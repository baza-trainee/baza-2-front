"use client"

import styles from "./StructureCard.module.scss";
import { useTranslations } from "next-intl";
import MainLink from "../../../shared/MainLink/MainLink";
import stateUseAlert from '@/src/state/stateUseAlert';


export default function StructureCard({ item }) {
  const t = useTranslations("Main.our_structure_section");
  const open = stateUseAlert(state => state.open)
  const { img, title, text, width, height, url, openInNewTab, type } = item;
  
  const handleClick = (e) => {
    if (url === "https://baza-poligon.com.ua" || url === "https://baza-educate.com.ua") {
      e.preventDefault(); 
      open("info");
    }
  };

  return (
    <div className={styles.cardStyle}>
      <div className={styles.cardWrapper}>
        <div className={styles.ellipseWrapper}></div>
        <img
          className={styles.svgWrapper}
          src={img}
          width={width}
          height={height}
          alt={t(title)}
        />
      </div>
      <div className={styles.textCard}>
        <MainLink
          className={styles.header}
          url={url}
          openInNewTab={openInNewTab}
          type={type}
          onClick={handleClick}
        >
          <h3>{t(title)}</h3>
        </MainLink>
        <p className={styles.text}>{t(text)}</p>
      </div>
    </div>
  );
}
