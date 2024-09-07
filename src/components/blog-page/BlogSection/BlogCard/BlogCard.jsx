import { useTranslations } from "next-intl";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";
import MainLink from "@/src/components/shared/MainLink/MainLink";
import linkTypes from "@/src/components/shared/MainLink/constants";

const BlogCard = ({ id, img, title, description, date, adminOnclick }) => {
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
      {adminOnclick ? (
        <button
          type="button"
          className={styles.readArticle}
          onClick={adminOnclick}
        >
          {t("btn_read_article")}
        </button>
      ) : (
        <MainLink url={`blog/${id}`} type={linkTypes.BLOG}>
          {t("btn_read_article")}
        </MainLink>
      )}
    </article>
  );
};

export default BlogCard;
