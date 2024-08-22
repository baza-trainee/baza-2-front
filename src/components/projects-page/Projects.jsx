"use client";

import { createKey } from "@/src/lib/utils/createKey";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LoadMore from "../shared/LoadMore/LoadMore";
import { createImageUrlBaza1 } from "@/src/lib/hooks/createImageUrl";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/src/api/projects";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./Projects.module.scss";
import InputSearch from "../shared/inputs/InputSearch/InputSearch";
import clsx from "clsx";

const Projects = () => {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [projectsData, setProjectsData] = useState(null);

  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ["projects", page, search],
    queryFn: () => {
      return getAllProjects({ page, search });
    },
    keepPreviousData: true,
  });

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const searchProject = (search) => {
    setProjectsData(null);
    setPage(1);
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
        <InputSearch
          className={styles.search}
          onSubmit={searchProject}
          isSearchBtnDisabled={search?.length ? false : true}
        />
        <div className={styles.content}>
          {projectsData &&
            projectsData.map((project) => (
              <ProjectCard
                key={createKey()}
                project={project}
                locale={locale}
                coverImgUrl={createImageUrlBaza1(project.imageUrl)}
              />
            ))}
        </div>
        {
          <LoadMore
            disabled={isFetching}
            onClick={loadMore}
            text={t("load_more")}
            className={clsx(
              styles.loadMore,
              page >= data?.pagination.totalPages && styles.hidden
            )}
          />
        }
      </div>
    </section>
  );
};

export default Projects;
