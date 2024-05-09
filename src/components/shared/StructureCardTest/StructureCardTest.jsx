import Image from "next/image";
import styles from "./StructureCardTest.module.scss";
import educat from './images/educat.svg';
import skill from './images/skill.svg';
import logoblack from './images/logoblack.svg';
import { useTranslations } from "next-intl";

export default function StructureCardTest(title, text) {
  const t = useTranslations("Main.our_structure_section");

  return (
    <>
      <div className={styles.cardStyle}>
        <div className={styles.cardWrapper}>
          <div className={styles.ellipseWrapper}></div>
          <Image  className={styles.svgWrapper} src={logoblack} alt="baza logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>{t(title)}</p>
          <p className={styles.text}>
          {t(text)}
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.cardWrapper}>
        <Image src={skill} alt="skill logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>{t(title)}</p>
          <p className={styles.text}>
          {t(text)}
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.eduCardWrapper}>
          <div className={styles.ellipseWrapper}></div>
          <Image className={styles.svgWrapper} src={educat} alt="educate logo" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>{t(title)}</p>
          <p className={styles.text}>
          {t(text)}
          </p>
        </div>
      </div>
      <div className={styles.cardStyle}>
        <div className={styles.cardWrapper}>
        <Image  className={styles.svgWrapper} src={logoblack} alt="edu logo svg" />
        </div>
        <div className={styles.textCard}>
          <p className={styles.header}>{t(title)}</p>
          <p className={styles.text}>
          {t(text)}
          </p>
        </div>
      </div>
    </>
  );
}
