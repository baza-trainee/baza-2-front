import { useTranslations } from 'next-intl';
import MainLink from '../MainLink/MainLink';
import styles from './BlogCard.module.scss'
import Image from 'next/image';
import linkTypes from '../MainLink/constants';

const BlogCard = ({ item }) => {
  const { img, title, description, link, date } = item;
  const t = useTranslations("Main.press_about_section");

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
        type={linkTypes.CARD}
        className={styles.linkRead}
        target="blank"
      >
        {t("btn_read_article")}
      </MainLink>
    </li>
  );
};

export default BlogCard;