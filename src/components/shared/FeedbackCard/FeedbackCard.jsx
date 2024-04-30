import Image from "next/image";
import photo from "./images/Img.jpg";
import styles from "./FeedbackCard.module.scss";

const FeedbackCard = ({ image, name, role, date, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.person}>
        <Image src={photo} className={styles.photo} alt="avatar" />
        <div className={styles.profile}>
          <p className={styles.name}>Олена</p>
          <p className={styles.role}>учасниця, QA</p>
          <p className={styles.date}>червень 2023</p>
        </div>
      </div>
      <div>
        <p className={styles.text}>
          “Я останні два тижні щодня думаю про те, що на Базу варто було прийти
          мінімум для того, щоб усвідомити значущість роботи дизайнера в
          розробці ПЗ”
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
