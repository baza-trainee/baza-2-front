import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { results } from "./items";
import { createKey } from "@/src/lib/utils/createKey";
import styles from "./Projects.module.scss";
import InputField from "../../shared/InputField/InputField";
import { useTranslations } from "next-intl";

const Projects = () => {
  const t = useTranslations("Projects");

  return (
    <section className={styles.section}>
      <div className={styles.projectsContainer}>
        <h1 className={styles.title}>{t("title")}</h1>
        <InputField version={"input"} />
        <div className={styles.content}>
          {results.map((data) => (
            <ProjectCard key={createKey()} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
