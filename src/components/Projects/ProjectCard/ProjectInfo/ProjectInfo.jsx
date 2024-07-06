import React from "react";
import styles from "./ProjectInfo.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import clsx from "clsx";
import { Icon } from "@/src/components/shared/Icon/Icon";

const ProjectInfo = ({ complexity }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="calendar" />
          <span>Старт проекту</span>
        </div>
        <p>15 cічня 2024</p>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="clock" />
          <span>Тривалість</span>
        </div>
        <p>6 тижнів</p>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="complexity" />
          <span>Складність</span>
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
  );
};

export default ProjectInfo;
