import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import linkTypes from "../MainLink/constants";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";

export const ArticleCard = ({ item }) => {
  const { imageUrl, title, description, link, date } = item;
  const t = useTranslations("Main.press_about_section");

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <Image src={createImageUrl(imageUrl)} fill sizes="100%" alt={title} />
        <span className={styles.date}>{formatDateToNumeric(date)}</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3 lang="uk-UA">{title}</h3>
          <p lang="uk-UA">{description}</p>
        </div>
        <MainLink url={link} type={linkTypes.CARD} openInNewTab>
          {t("btn_read_article")}
        </MainLink>
      </div>
    </div>
  );
};
