import React from "react";
import styles from "./ProjectCard.module.scss";
import clsx from "clsx";
import { createKey } from "@/src/lib/utils/createKey";

const ProjectCard = ({ data }) => {
  const { complexity } = data;

  return (
    <article className={styles.article}>
      <span className={styles.status}>In progress</span>
      <h3 className={styles.title}>Lorem ipsum dolor</h3>
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
      <button type="button" className={styles.button}>
        Team
      </button>
    </article>
  );
};

export default ProjectCard;
