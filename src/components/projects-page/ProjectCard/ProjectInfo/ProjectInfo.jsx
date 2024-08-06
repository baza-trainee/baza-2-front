import React from "react";
import styles from "./ProjectInfo.module.scss";
import { createKey } from "@/src/lib/utils/createKey";
import clsx from "clsx";
import { Icon } from "@/src/components/shared/Icon/Icon";
import { useParams } from "next/navigation";
import { formatDate } from "@/src/lib/utils/formatData";
import { useTranslations } from "next-intl";

const ProjectInfo = ({ complexity, creationDate, launchDate }) => {
  const { locale } = useParams();
  const t = useTranslations("Projects.card.info");

  const date = formatDate(creationDate, locale);

  const launch = launchDate ? launchDate : Date.now();
  const numOfWeeks = Math.floor(
    (launch - creationDate) / (1000 * 60 * 60 * 24 * 7) + 1
  );

  return (
    <div className={styles.info}>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="calendar" />
          <span>{t("start")}</span>
        </div>
        <p>{date}</p>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="clock" />
          <span>{t("duration")}</span>
        </div>
        <p>
          {t("weeks", {
            count: numOfWeeks,
            ordinal: true,
          })}
        </p>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.name}>
          <Icon name="complexity" />
          <span>{t("complexity")}</span>
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
