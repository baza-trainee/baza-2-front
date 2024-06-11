"use client";

import Advantage from "../shared/Advantage/Advantage";
import { items } from "./Items";
import styles from "./AdvantagesSection.module.scss";

const AdvantagesSection = () => {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Переваги стажування</h3>
      <ul className={styles.list}>
        {items.map(({ img, text }) => (
          <li key={img}>
            <Advantage img={img} text={text} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AdvantagesSection;
