import Image from "next/image";
import styles from "./HeroCard.module.scss";

export const HeroCard = ({ title, desc, img }) => {
  return (
    <div className={styles.container}>
      <Image fill sizes="100%" src={img} alt={title} className={styles.image} />
      <div className={styles.wrapper}>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};
