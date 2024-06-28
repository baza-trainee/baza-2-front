import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { results } from "./items";
import { createKey } from "@/src/lib/utils/createKey";
import styles from "./Projects.module.scss";

const Projects = () => {
  return (
    <section className="section">
      <div className={styles.projectsContainer}>
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
