import clsx from "clsx";
import styles from "./HeroCard.module.scss";
import Image from "next/image";
import { imageLoader } from "@/src/lib/hooks/createImageUrl";

const HeroCard = ({ title, desc, img, className }) => {

  return (
    <div className={clsx(styles.card, className)}>
      <Image
        loader={imageLoader}
        fill
        sizes="100%"
        src={img}
        alt={title}
        className={styles.image}
        quality={60}
      />
      <div className={styles.wrapper}>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default HeroCard;
