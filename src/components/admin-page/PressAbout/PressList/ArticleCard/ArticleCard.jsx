import styles from "./ArticleCard.module.scss";
import Image from "next/image";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import MainLink from "@/src/components/shared/MainLink/MainLink";
import linkTypes from "@/src/components/shared/MainLink/constants";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";

export const ArticleCard = ({ data }) => {
  const { imageUrl, title, description, link, date } = data;

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <Image
          className={styles.image}
          src={createImageUrl(imageUrl)}
          fill
          sizes="100%"
          alt={title}
        />
        <span className={styles.date}>{formatDateToNumeric(date)}</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <MainLink url={link} type={linkTypes.CARD} openInNewTab>
          {'Читати статтю'}
        </MainLink>
      </div>
    </div>
  );
};
