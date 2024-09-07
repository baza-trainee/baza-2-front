import Image from "next/image";
import styles from "./BlogArticle.module.scss";
import { formatDateToNumeric } from "@/src/lib/utils/formatData";
import { splitTextHalf } from "@/src/lib/utils/splitTextHalf";

const BlogArticle = ({ title, text, imgUrl, date }) => {
  const formattedDate = formatDateToNumeric(date);
  const { strA, strB } = splitTextHalf(text);

  return (
    <div className={styles.article}>
      <div className={styles.topInfo}>
        <h3>{title}</h3>
        <span className={styles.date}>{formattedDate}</span>
      </div>
      <div className={styles.wrapperText}>
        <p>{strA}</p>
        <div className={styles.wrapperImg}>
          <Image src={imgUrl} fill sizes="100%" alt={title} />
        </div>
        <p>{strB}</p>
      </div>
    </div>
  );
};

export default BlogArticle;
