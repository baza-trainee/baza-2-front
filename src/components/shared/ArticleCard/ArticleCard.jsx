import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const ArticleCard = ({ item }) => {
  const { img, title, description, link } = item;
  const t = useTranslations("Main.press_about_section");

  return (
    <div className={styles.containerForCard}>
      <Image
        className={styles.image}
        src={img}
        width={397}
        height={242}
        alt={t(title)}
      />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3 className={styles.title}>{t(title)}</h3>
          <p className={styles.text}>{t(description)}</p>
        </div>
        <Link
          className={styles.linkRead}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("btn_read_article")}
        </Link>
      </div>
    </div>
  );
};
