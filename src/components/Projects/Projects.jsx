import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { results } from "./items";
import { createKey } from "@/src/lib/utils/createKey";
import styles from "./Projects.module.scss";
import InputField from "../shared/InputField/InputField";

const Projects = () => {
  return (
    <section className={styles.section}>
      <div className={styles.projectsContainer}>
        <h1 className={styles.title}>Projects</h1>
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
