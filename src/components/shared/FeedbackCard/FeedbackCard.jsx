import Image from "next/image";
import photo from "./images/Img.jpg";
import styles from "./FeedbackCard.module.scss";

const FeedbackCard = ({ image, name, role, date, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.person}>
        <Image src={photo} className={styles.photo} alt="avatar" />
        <div className={styles.profile}>
          <p className={styles.name}>{name}</p>
          <p className={styles.role}>{role}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div>
        <p className={styles.text}>“{text}”</p>
      </div>
    </div>
  );
};

export default FeedbackCard;
