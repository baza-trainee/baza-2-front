"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./RoleCard.module.scss";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";

const RoleCard = ({ imgSrc, shortDesc, title, children }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className={styles.article}>
      {imgSrc && (
        <div className={styles.imageContainer}>
          <Image
            sizes="100%"
            fill
            alt={title ?? "Описание отсутсвует"}
            src={imgSrc}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.shortDesc}>{shortDesc}</p>
        <button onClick={() => setReadMore(true)} className={styles.readMore}>
          Читати далі
        </button>
      </div>
      <div className={clsx(styles.fullDesc, readMore && styles.showFullDesc)}>
        <button
          onClick={() => setReadMore(false)}
          className={styles.fullDescClose}
        >
          <Icon name="arrow-back" />
        </button>
        {children}
      </div>
    </article>
  );
};

export default RoleCard;
