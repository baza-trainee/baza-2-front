"use client";

import React, { useCallback, useState } from "react";
import styles from "./ProjectCard.module.scss";
import clsx from "clsx";
import Image from "next/image";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectCardTeam from "./ProjectCardTeam/ProjectCardTeam";
import { Icon } from "../../shared/Icon/Icon";
import { useTranslations } from "next-intl";
import ProjectStatus from "./ProjectStatus/ProjectStatus";
import { imageLoader } from "@/src/lib/hooks/createImageUrl";

const ProjectCard = ({ project, coverImgUrl, locale = "ua" }) => {
  const {
    complexity,
    title,
    creationDate,
    launchDate,
    teamMembers,
    isTeamRequired,
    deployUrl,
  } = project;
  const t = useTranslations("Projects.card");
  const [isTeamShowed, setIsTeamShowed] = useState(false);

  const handleClose = useCallback(() => {
    setIsTeamShowed((state) => !state);
  }, []);

  return (
    <>
      {project && (
        <article
          className={clsx(styles.article, isTeamShowed && styles.hideBg)}
        >
          <div className={styles.imgContainer}>
            <Image
              loader={imageLoader}
              src={coverImgUrl}
              fill sizes="100%"
              alt={title[locale]}
            />
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
              deployUrl={deployUrl ?? null}
            />

            <button
              onClick={handleClose}
              type="button"
              className={clsx(
                styles.button,
                teamMembers.length > 0 && styles.show
              )}
            >
              <Icon name="team" />
              <span>{t("team")}</span>
            </button>
          </div>
          {teamMembers.length > 0 && (
            <ProjectCardTeam
              project={project}
              isShowed={isTeamShowed}
              handleClose={handleClose}
            />
          )}
        </article>
      )}
    </>
  );
};

export default ProjectCard;
