import Image from "next/image";
import styles from "./StructureCard.module.scss";
import substrate from './images/substrate.svg';
import { Icon } from "../Icon/Icon";

export default function StructureCard({ header, text}) {
  return (
    <div className={styles.cardStyle}>
      <div className={styles.svgWrapper}>
        <Image className={styles.substrateWrapper} src={substrate} alt="substrate svg" />
        <Icon className={styles.logoWrapper} name="logo-black" width={120} height={120} />
      </div>
      <div className={styles.textCard}>
        <p className={styles.header}> {header}BAZA TRAINEE UKRAINE</p>
        <p className={styles.text}>
          {" "}
          {text}Громадський проєкт для джуніорів і світчерів ІТ, який
          побудований на створенні цифрових проєктів для соціальної сфери
          України
        </p>
      </div>
    </div>
  );
}
