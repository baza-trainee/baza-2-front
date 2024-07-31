"use client";

import { createKey } from "@/src/lib/utils/createKey";
import { useTranslations } from "next-intl";
import InputSearch from "../shared/InputSearch/InputSearch";
import { useEffect, useState } from "react";
import LoadMore from "../shared/LoadMore/LoadMore";
import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/src/api/projects";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./Projects.module.scss";

const Projects = () => {
  const t = useTranslations("Projects");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [projectsData, setProjectsData] = useState(null);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["projects", page, limit, search],
    queryFn: () => {
      return getAllProjects({ page, search, limit });
    },
    keepPreviousData: true,
  });

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const searchProject = (search) => {
    setSearch(search);
  };

  const concatProjectData = (data) => {
    setProjectsData((prevData) => prevData.concat(data));
  };

  useEffect(() => {
    if (data) setProjectsData(data.results);
  }, []);

  useEffect(() => {
    if (!projectsData && data) setProjectsData(data.results);
    if (projectsData && data) concatProjectData(data.results);
  }, [data]);

  if (isLoading) <h1 className={styles.section}>{"Loading..."}</h1>;

  if (isError) <h1 className={styles.section}>{"Error"}</h1>;

  return (
    <section className={styles.section}>
      <div className={styles.projectsContainer}>
        <h1 className={styles.title}>{t("title")}</h1>
        <InputSearch onSubmit={searchProject} />
        <div className={styles.content}>
          {projectsData &&
            projectsData.map((project) => (
              <ProjectCard
                key={createKey()}
                project={project}
                coverImgUrl={createImageUrlBaza1(project.imageUrl)}
              />
            ))}
        </div>
        <LoadMore onClick={loadMore} className={styles.loadMore} />
      </div>
    </section>
  );
};

export default Projects;
