import styles from "./StructureCard.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function StructureCard({ item }) {
  const t = useTranslations("Main.our_structure_section");
  const { img, title, text, width, height, url } = item;

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
        <Link
          className={styles.header}
          href={url}
          target={url === "https://baza-skill.com.ua" ? "_blank" : ""}
        >
          {t(title)}
        </Link>
        <h3 className={styles.text}>{t(text)}</h3>
      </div>
    </div>
  );
}
