import { useTranslations } from "next-intl";
import MainLink from "../MainLink/MainLink";
import styles from "./BlogCard.module.scss";
import Image from "next/image";
import linkTypes from "../MainLink/constants";

const BlogCard = ({ item }) => {
  const { img, title, description, link, date } = item;
  const t = useTranslations("Blog.blog_section");

  return (
    <li className={styles.card}>
      <div className={styles.wrapper}>
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
        <div className={styles.content}>
          <h3>{t(title)}</h3>
          <p>{t(description)}</p>
        </div>
      </div>
      <MainLink
        url={link}
        type={linkTypes.BLOG}
      >
        {t("btn_read_article")}
      </MainLink>
    </li>
  );
};

export default BlogCard;




// import { useRouter } from 'next/router'
 
// export default function ReadMore({ post }) {
//   const router = useRouter()
 
//   return (
//     <button
//       type="button"
//       onClick={() => {
//         router.push({
//           pathname: '/post/[pid]',
//           query: { pid: post.id },
//         })
//       }}
//     >
//       Click here to read more
//     </button>
//   )
// }