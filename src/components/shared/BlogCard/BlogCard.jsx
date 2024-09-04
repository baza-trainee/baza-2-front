import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import linkTypes from "../MainLink/constants";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";

const BlogCard = ({ id, img, title, description, date, pathname }) => {
  const t = useTranslations("Blog");
  const formattedDate = formatDateToNumeric(date);

  return (
    <article className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <Image src={img} fill sizes="100%" alt={title} />
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <MainLink url={`blog/${id}`} type={linkTypes.BLOG}>
        {t("btn_read_article")}
      </MainLink>
    </article>
  );
};

export default BlogCard;
