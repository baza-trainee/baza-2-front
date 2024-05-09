import Image from "next/image";
import styles from "./StructureCardTest.module.scss";
import educat from './images/educat.svg';
import skill from './images/skill.svg';
import logoblack from './images/logoblack.svg';

export default function StructureCardTest() {
  return (
    <>
      <div className={styles.cardStyle}>
        <div className={styles.cardWrapper}>
          <div className={styles.ellipseWrapper}></div>
          <Image  className={styles.svgWrapper} src={logoblack} alt="baza logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}> BAZA TRAINEE UKRAINE</p>
          <p className={styles.text}>
            Громадський проєкт для джуніорів і світчерів ІТ, який
            побудований на створенні цифрових проєктів для соціальної сфери
            України
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.skillWrapper}>
        <Image src={skill} alt="skill logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>BAZA SKILL</p>
          <p className={styles.text}>
            Власна рекрутингова агенція для наших випускників. 
            База даних перевірених джунів з досвідом командної розробки
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.eduCardWrapper}>
          <div className={styles.eduEllipseWrapper}></div>
          <Image className={styles.svgWrapper} src={educat} alt="educate logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>BAZA EDUCAT</p>
          <p className={styles.text}>
            Учбові курси різних рівнів складності для розробників, 
            де навчають спільній роботі і командній розробці. 
            Додай софт скіли до технічних знань і отримай додаткову підтримку на ринку праці 
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.cardWrapper}>
        <Image  className={styles.svgWrapper} src={logoblack} alt="edu logo svg" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>BAZA POLIGON</p>
          <p className={styles.text}>
            Веб агенція для малого і середнього бізнесу.  
            Створені в 2023 в Україні і для України.
          </p>
        </div>
      </div>
    </>
  );
}
