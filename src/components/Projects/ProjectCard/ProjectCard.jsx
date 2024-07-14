"use client";

import React, { useCallback, useState } from "react";
import styles from "./ProjectCard.module.scss";
import clsx from "clsx";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProjectInfo from "./ProjectInfo/ProjectInfo";
import ProjectCardTeam from "./ProjectCardTeam/ProjectCardTeam";
import { Icon } from "../../shared/Icon/Icon";

const ProjectCard = ({ data }) => {
  const { complexity, imageUrl, title, creationDate } = data;
  const { locale } = useParams();
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
        <span className={clsx(styles.status)}>In progress</span>
        <h3 className={styles.title}>{title[locale]}</h3>
        <ProjectInfo complexity={complexity} creationDate={creationDate} />
        <button onClick={handleClose} type="button" className={styles.button}>
          <Icon name="team" />
          <span>Команда проекту</span>
        </button>
      </div>
      <ProjectCardTeam
        project={data}
        isShowed={isTeamShowed}
        handleClose={handleClose}
      />
    </article>
  );
};

export default ProjectCard;
