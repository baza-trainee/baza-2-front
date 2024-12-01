import { useTranslations } from "next-intl";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";
import MainLink from "@/src/components/shared/MainLink/MainLink";
import linkTypes from "@/src/components/shared/MainLink/constants";
import { imageLoader } from "@/src/lib/hooks/createImageUrl";

const BlogCard = ({ id, img, title, description, date, adminOnclick }) => {
  const t = useTranslations("Blog");
  const formattedDate = formatDateToNumeric(date);

  const removeLinks = (text) => {
    const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    return text.replace(urlRegex, ""); // Удаляем все совпадения
  };

  return (
    <article className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.img}>
          <Image loader={imageLoader} src={img} fill sizes="100%" alt={title} />
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.content}>
          <h2 lang="uk-UA" className={styles.title}>
            {title}
          </h2>
          <p lang="uk-UA" className={styles.description}>
            {removeLinks(description)}
          </p>
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
