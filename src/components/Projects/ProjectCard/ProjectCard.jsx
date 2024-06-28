"use client";

import React, { useState } from "react";
import styles from "./ProjectCard.module.scss";
import clsx from "clsx";
import { createKey } from "@/src/lib/utils/createKey";
import Image from "next/image";
import { useParams } from "next/navigation";

const ProjectCard = ({ data }) => {
  const { complexity, imageUrl, title } = data;
  const { locale } = useParams();
  const [isTeamShowed, setIsTeamShowed] = useState(false);

  return (
    <article className={styles.article}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} fill sizes="100%" alt={title[locale]} />
      </div>
      <div className={styles.content}>
        <span className={clsx(styles.status)}>In progress</span>
        <h3 className={styles.title}>{title[locale]}</h3>
        <div className={styles.info}>
          <div className={styles.infoRow}>
            <div className={styles.name}>
              <span></span>Старт проекту
            </div>
            <p>15 cічня 2024</p>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.name}>
              <span></span>Тривалість
            </div>
            <p>6 тижнів</p>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.name}>
              <span></span>Складність
            </div>
            <div className={styles.complexity}>
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={createKey()}
                  className={clsx(
                    styles.circle,
                    complexity >= index + 1 && styles.circleActive
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsTeamShowed((state) => !state)}
          type="button"
          className={styles.button}
        >
          <span></span>
          Команда проекту
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
