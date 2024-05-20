import Image from "next/image";
import styles from "./FeedbackCard.module.scss";

const FeedbackCard = ({ image, name, role, date, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.person}>
        <div className={styles.imageContainer}>
          <Image fill sizes="100%" src={image} alt="avatar" />
        </div>
        <div className={styles.profile}>
          <div className={styles.personInfo}>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{role}</p>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.text}>“{text}”</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
