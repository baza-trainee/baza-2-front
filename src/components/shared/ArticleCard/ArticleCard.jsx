import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import linkTypes from "../../shared/MainLink/constants";
import MainLink from "../MainLink/MainLink";

export const ArticleCard = ({ img, title, description, link }) => {
  const t = useTranslations("Main.press_about_section");

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.image}
          src={img}
          fill
          sizes="100%"
          alt={t(title)}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{t(title)}</h3>
        <p className={styles.desc}>{t(description)}</p>
        <MainLink url={link} type={linkTypes.DEFAULT}>
          {t("btn_read_article")}
        </MainLink>
      </div>
    </div>
  );
};
