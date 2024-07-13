"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import { useTranslations } from "next-intl";
import styles from "./RoleCard.module.scss";

const RoleCard = ({ imgSrc, desc1, desc2, title }) => {
  const t = useTranslations("Internship.invite_participate");
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
        <div className={styles.shortDescWrapper}>
          <p className={styles.shortDesc}>{desc1}</p>
        </div>
        <button onClick={() => setReadMore(true)} className={styles.readMore}>
          {t("card_link")}
        </button>
      </div>
      <div
        data-lenis-prevent
        className={clsx(
          styles.fullDescWrapper,
          readMore && styles.showFullDesc
        )}
      >
        <div className={styles.fullDesc}>
          <button
            onClick={() => setReadMore(false)}
            className={styles.fullDescClose}
          >
            <Icon name="arrow-back" />
          </button>
          <p>{desc1}</p>
          <p>{desc2}</p>
        </div>
      </div>
    </article>
  );
};

export default RoleCard;
