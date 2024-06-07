import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MainLink from "../MainLink/MainLink";
import linkTypes from "../MainLink/constants";

export const ArticleCard = ({ item }) => {
  const { img, title, description, link, date } = item;
  const t = useTranslations("Main.press_about_section");

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <Image
          className={styles.image}
          src={img}
          fill
          sizes="100%"
          alt={t(title)}
        />
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3>{t(title)}</h3>
          <p>{t(description)}</p>
        </div>
        <MainLink
          url={link}
          type={linkTypes.CARD}
          className={styles.linkRead}
          target="blank"
        >
          {t("btn_read_article")}
        </MainLink>
      </div>
    </div>
  );
};
