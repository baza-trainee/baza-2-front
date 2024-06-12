"use client";

import Image from "next/image";
import styles from "./Advantage.module.scss";

const Advantage = ({ img, text }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image src={img} sizes="100%" fill alt={text} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Advantage;
