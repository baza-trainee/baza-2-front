import Image from "next/image";
import styles from "./FeedbackCard.module.scss";
import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { formatDate } from "@/src/lib/utils/formatData";

const FeedbackCard = ({ imageUrl, name, role, date, review, className }) => {
 // Мова сторінки.
 const { locale } = useParams();

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.person}>
        <div className={styles.imageContainer}>
          <Image fill sizes="100%" src={createImageUrlBaza1(imageUrl)} alt={name[locale]} />
        </div>
        <div className={styles.profile}>
          <div className={styles.personInfo}>
            <p className={styles.name}>{name[locale]}</p>
            <p className={styles.role}>{role}</p>
            <p className={styles.date}>{formatDate(date, locale)}</p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.text}>“{review[locale]}”</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
