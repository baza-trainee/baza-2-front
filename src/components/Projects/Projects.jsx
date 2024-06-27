import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import { results } from "./items";
import { createKey } from "@/src/lib/utils/createKey";

const Projects = () => {
  return (
    <section className="section">
      <div className="container">
        {results.map((data) => (
          <ProjectCard key={createKey()} data={data} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
