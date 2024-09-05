import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import linkTypes from "../MainLink/constants";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";
import { usePathname } from "next/navigation";

const BlogCard = ({ id, img, title, description, date, adminOnclick }) => {
  const t = useTranslations("Blog");
  const formattedDate = formatDateToNumeric(date);
  const pathname = usePathname();
  const isAdminPage =
    pathname.split("/").includes("admin") ||
    pathname.split("/").includes("login");

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
      {isAdminPage ? (
        <button
          type="button"
          className={styles.readArticle}
          onClick={adminOnclick ?? null}
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
