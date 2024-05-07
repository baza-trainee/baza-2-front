import Image from "next/image";
import styles from "./HeroCard.module.scss";
import { useTranslations } from "next-intl";

export const HeroCard = ({ title, desc, img }) => {
  const t = useTranslations("Main.hero_сarousel_section");
  return (
    <div className={styles.card}>
      <Image fill sizes="100%" src={img} alt={title} className={styles.image} priority/>
      <div className={styles.wrapper}>
        <h2>{t(title)}</h2>
        <p>{t(desc)}</p>
      </div>
    </div>
  );
};
