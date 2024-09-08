import Image from "next/image";
import styles from "./BlogArticle.module.scss";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";
import { splitTextHalf } from "@/src/lib/utils/splitTextHalf";
import FormaterBlogText from "@/src/components/shared/FormaterBlogText/FormaterBlogText";

const BlogArticle = ({ title, text, imgUrl, date }) => {
  const formattedDate = formatDateToNumeric(date);
  const { strA, strB } = splitTextHalf(text);

  return (
    <div className={styles.article}>
      <div className={styles.topInfo}>
        <h3 lang="uk-UA">{title}</h3>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <div className={styles.wrapperText}>
        {strA && (
          <div className={styles.paragraphWrapper}>
            {FormaterBlogText(strA)}
          </div>
        )}
        <div className={styles.wrapperImg}>
          <Image src={imgUrl} fill sizes="100%" alt={title} />
        </div>
        {strB && (
          <div className={styles.paragraphWrapper}>
            {FormaterBlogText(strB)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogArticle;
