"use client";

import React, { useCallback, useState } from "react";
import styles from "./ProjectCard.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectCardTeam from "./ProjectCardTeam/ProjectCardTeam";
import { Icon } from "../../../shared/Icon/Icon";
import { useTranslations } from "next-intl";
import ProjectStatus from "./ProjectStatus/ProjectStatus";

const ProjectCard = ({ data }) => {
  const {
    complexity,
    imageUrl,
    title,
    creationDate,
    launchDate,
    teamMembers,
    isTeamRequired,
  } = data;
  const { locale } = useParams();
  const t = useTranslations("Projects.card");
  const [isTeamShowed, setIsTeamShowed] = useState(false);

  const handleClose = useCallback(() => {
    setIsTeamShowed((state) => !state);
  }, []);

  return (
    <article className={clsx(styles.article, isTeamShowed && styles.hideBg)}>
      <div className={styles.imgContainer}>
        <Image src={imageUrl} fill sizes="100%" alt={title[locale]} />
      </div>
      <div className={clsx(styles.content, isTeamShowed && styles.hidden)}>
        <ProjectStatus
          creationDate={creationDate}
          launchDate={launchDate}
          isTeamRequired={isTeamRequired}
        />
        <h3 className={styles.title}>{title[locale]}</h3>
        <ProjectInfo
          complexity={complexity}
          creationDate={creationDate}
          launchDate={launchDate}
        />
        <button
          onClick={handleClose}
          type="button"
          className={clsx(styles.button, teamMembers && styles.show)}
        >
          <Icon name="team" />
          <span>{t("team")}</span>
        </button>
      </div>
      {teamMembers && (
        <ProjectCardTeam
          project={data}
          isShowed={isTeamShowed}
          handleClose={handleClose}
        />
      )}
    </article>
  );
};

export default ProjectCard;
