import styles from "./StructureCard.module.scss";
import { useTranslations } from "next-intl";
import MainLink from "../../shared/MainLink/MainLink";

export default function StructureCard({ item }) {
  const t = useTranslations("Main.our_structure_section");
  const { img, title, text, width, height, url, openInNewTab } = item;

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
        >
          {t(title)}
        </MainLink>
        <h3 className={styles.text}>{t(text)}</h3>
      </div>
    </div>
  );
}
