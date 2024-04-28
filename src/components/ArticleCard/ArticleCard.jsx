import styles from "./ArticleCard.module.scss";
import Image from "next/image";

export const ArticleCard = ({ img, title, desc, link, alt }) => {
  console.log(img);
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={img}
        width={397}
        height={242}
        alt={alt}
      />
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{desc}</p>
        <a className={styles.linkRead} href={link}>
          Читати статтю
        </a>
        {/* <Link/> ??*/}
      </div>
    </div>
  );
};
