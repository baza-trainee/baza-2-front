import Image from "next/image";
import img from "./Images/image.jpg"
import MainButton from "../shared/MainButton/MainButton";

import styles from "./MentorSection.module.scss";

const MentorSection = () => {
  return (
    <section className={styles.mentor}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ментору</h1>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <p>
              Ментор - це колега на два рівні вищий за менторі, який слідкує за
              виконанням задач і допомагає порадою або роз`ясненням, коли учасник
              не впевнений в рішенні.
            </p>
            <p>
              Наші ментори - практики провідних ІТ-компаній України, які прагнуть
              підтримати новачків знаннями і розширити власні управлінські
              навички.
            </p>
            <p>
              На Baza Trainee Ukraine ментор направляє команду одразу з декількох
              осіб, спряючи їхньому професійному розвитку.
            </p>
          </div>
          <Image
            className={styles.image}
            src={img}
            width={628}
            height={496}
            alt="About mentor team"
          />
        </div>
        <MainButton>Стати ментором</MainButton>
      </div>
    </section>
  );
};

export default MentorSection;
