import styles from "./StructureCard.module.scss";
import { useTranslations } from "next-intl";

export default function StructureCard({ item, id }) {
  const t = useTranslations("Main.our_structure_section");
  const { img, title, text, width, height } = item;

  return (
    <div className={styles.cardStyle}>
      <div className={styles.cardWrapper}>
        <div className={styles.ellipseWrapper}></div>
        <img
          className={styles.svgWrapper}
          id={id}
          src={img}
          width={width}
          height={height}
          alt={t(title)}
        />
      </div>
      <div className={styles.textCard}>
        <p className={styles.header}>{t(title)}</p>
        <p className={styles.text}>{t(text)}</p>
      </div>
    </div>
  );
}
