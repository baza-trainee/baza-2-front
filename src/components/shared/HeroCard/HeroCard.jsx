import Image from "next/image";
import styles from "./HeroCard.module.scss";
import { useTranslations } from "next-intl";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import clsx from "clsx";

const HeroCard = ({ title, desc, img, className }) => {
  const t = useTranslations("Main.hero_carousel_section");
  return (
    <div className={clsx(styles.card, className)}>
      <Image
        fill
        sizes="100%"
        src={className ? createImageUrl(img) : img}
        alt={title}
        className={styles.image}
        quality={60}
      />
      <div className={styles.wrapper}>
        <h2>{className ? title : t(title)}</h2>
        <p>{className ? desc :t(desc)}</p>
      </div>
    </div>
  );
};

export default HeroCard;
