import React from "react";
import styles from "./ProjectInfo.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import clsx from "clsx";
import { Icon } from "@/src/components/shared/Icon/Icon";
import { useParams } from "next/navigation";
import { formatDate, formatDateToNumeric } from "@/src/lib/utils/formatData";

const ProjectInfo = ({ complexity, creationDate }) => {
  const { locale } = useParams();
  console.log(locale);
  const date = formatDate(creationDate, locale === "ua" ? "uk-UA" : locale);

  return (
    <div className={styles.info}>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="calendar" />
          <span>Старт проекту</span>
        </div>
        <p>{date}</p>
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
