import Image from "next/image";
import styles from "./FeedbackCard.module.scss";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import clsx from "clsx";
import { formatDate } from "@/src/lib/utils/formatData";
import { localeUkToUa } from "@/src/lib/utils/localeUkToUa";

const FeedbackCard = ({
  imageUrl,
  name,
  role,
  date,
  review,
  className,
  locale,
}) => {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.person}>
        <div className={styles.imageContainer}>
          <Image
            fill
            sizes="100%"
            src={createImageUrl(imageUrl)}
            alt={name[localeUkToUa(locale)]}
          />
        </div>
        <div className={styles.profile}>
          <div className={styles.personInfo}>
            <p className={styles.name}>{name[localeUkToUa(locale)]}</p>
            <p className={styles.role}>{role}</p>
            <p className={styles.date}>
              {formatDate(date, locale, "feedback")}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.text}>“{review[localeUkToUa(locale)]}”</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
